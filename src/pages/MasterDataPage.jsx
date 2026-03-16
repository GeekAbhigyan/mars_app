import { useEffect, useMemo, useRef, useState } from 'react';
import colors from '../constants/colors';
import { masterDataRows as initialRows } from '../constants/data';
import Dropdown from '../components/ui/Dropdown';

const DETAIL_FIELDS = [
  ['Copack Code', 'code', 'Copack Description', 'desc'],
  ['Case per Pallet', 'cpp', 'Batch Size (B1)', 'b1'],
  ['Batch Size (B2)', 'b2', 'Copack Type', 'type'],
  ['Output Rate', 'rate', 'Type', null],
  ['Safety Stock (weeks)', null, 'Line', null],
  ['Production Max, MOQ', null, 'Lead Time (Days)', null],
  ['Usage Status', 'usageStatus', 'Donor Code', 'donorCode'],
];

const buildCsvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const MasterDataPage = () => {
  const [rows, setRows] = useState(initialRows);
  const [selectedCode, setSelectedCode] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editSnapshot, setEditSnapshot] = useState(null);
  const detailsRef = useRef(null);

  // load rows from Django API if available
  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';
    if (!import.meta.env.VITE_API_BASE) {
      console.warn('VITE_API_BASE not defined; defaulting to', base);
    }
    fetch(`${base}/masterdata/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setRows(data);
        }
      })
      .catch((err) => {
        console.error('Error fetching master data from API', err);
      });
  }, []);

  const [codeTypeFilter, setCodeTypeFilter] = useState('All');
  const [copackFilter, setCopackFilter] = useState('All');
  const [donorFilter, setDonorFilter] = useState('All');
  const [usageFilter, setUsageFilter] = useState('All');

  const filterOptions = useMemo(
    () => ({
      codeTypes: ['All', ...new Set(rows.map((row) => row.type))],
      copackCodes: ['All', ...new Set(rows.map((row) => row.code))],
      donorCodes: ['All', ...new Set(rows.map((row) => row.donorCode))],
      usageStatuses: ['All', ...new Set(rows.map((row) => row.usageStatus))],
    }),
    [rows],
  );

  const filteredRows = useMemo(
    () =>
      rows.filter(
        (row) =>
          (codeTypeFilter === 'All' || row.type === codeTypeFilter) &&
          (copackFilter === 'All' || row.code === copackFilter) &&
          (donorFilter === 'All' || row.donorCode === donorFilter) &&
          (usageFilter === 'All' || row.usageStatus === usageFilter),
      ),
    [rows, codeTypeFilter, copackFilter, donorFilter, usageFilter],
  );

  const selected = selectedCode ? rows.find((row) => row.code === selectedCode) ?? null : null;

  useEffect(() => {
    if (selectedCode && !filteredRows.some((row) => row.code === selectedCode)) {
      setSelectedCode(null);
      setIsEditing(false);
      setEditSnapshot(null);
    }
  }, [filteredRows, selectedCode]);

  const handleSelectRow = (code) => {
    if (isEditing && selectedCode !== code) {
      if (editSnapshot) {
        setRows(editSnapshot);
      }
      setIsEditing(false);
      setEditSnapshot(null);
    }

    setSelectedCode(code === selectedCode ? null : code);
  };

  const handleStartEdit = () => {
    setEditSnapshot(rows.map((row) => ({ ...row })));
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    setEditSnapshot(null);
  };

  const handleCancelEdit = () => {
    if (editSnapshot) {
      setRows(editSnapshot);
    }
    setIsEditing(false);
    setEditSnapshot(null);
  };

  const handleFieldChange = (key, value) => {
    if (!selectedCode || !key) {
      return;
    }

    setRows((prev) =>
      prev.map((row) => (row.code === selectedCode ? { ...row, [key]: value } : row)),
    );
  };

  const handleResetFilters = () => {
    setCodeTypeFilter('All');
    setCopackFilter('All');
    setDonorFilter('All');
    setUsageFilter('All');
  };

  const handleDownload = () => {
    if (!filteredRows.length) {
      return;
    }

    const columns = ['code', 'desc', 'cpp', 'b1', 'b2', 'rule', 'type', 'rate', 'donorCode', 'usageStatus'];
    const csv = [
      columns.join(','),
      ...filteredRows.map((row) => columns.map((column) => buildCsvValue(row[column])).join(',')),
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'master-data.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShowDetails = () => {
    if (!selected) {
      return;
    }

    detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getInputStyle = (hasKey) => ({
    width: '100%',
    padding: '8px 12px',
    border: `1px solid ${isEditing && hasKey ? colors.sidebarActive : '#ddd'}`,
    borderRadius: 5,
    fontSize: 13,
    background: isEditing && hasKey ? '#fff' : '#fafafa',
    color: '#333',
    boxSizing: 'border-box',
    outline: 'none',
    cursor: isEditing && hasKey ? 'text' : 'default',
    transition: 'border-color 0.2s, background 0.2s',
  });

  return (
    <div style={{ padding: '20px 24px', background: colors.contentBg, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ margin: '0 0 16px', fontSize: 18, fontWeight: 700, color: colors.textDark }}>
        Master Data
      </h2>

      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          padding: '16px 20px',
          border: '1px solid #e8e8e8',
          marginBottom: 16,
        }}
      >
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {[
            { id: 'code-type-filter', label: 'Code Type', value: codeTypeFilter, setValue: setCodeTypeFilter, options: filterOptions.codeTypes },
            { id: 'copack-code-filter', label: 'Copack Code', value: copackFilter, setValue: setCopackFilter, options: filterOptions.copackCodes },
            { id: 'donor-code-filter', label: 'Donor Code', value: donorFilter, setValue: setDonorFilter, options: filterOptions.donorCodes },
            { id: 'usage-status-filter', label: 'Usage Status', value: usageFilter, setValue: setUsageFilter, options: filterOptions.usageStatuses },
          ].map((filter) => (
            <div key={filter.id}>
              <label
                htmlFor={filter.id}
                style={{ display: 'block', fontSize: 12, color: '#666', marginBottom: 4, fontWeight: 500 }}
              >
                {filter.label}
              </label>
              <Dropdown
                id={filter.id}
                label="All"
                value={filter.value}
                options={filter.options}
                onChange={filter.setValue}
                width={130}
              />
            </div>
          ))}

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 16px',
                border: '1.5px solid #ccc',
                borderRadius: 6,
                background: '#fff',
                cursor: 'pointer',
                fontSize: 13,
                color: '#555',
                fontWeight: 500,
              }}
            >
              Reset Filter
            </button>
            <button
              type="button"
              onClick={handleDownload}
              disabled={!filteredRows.length}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '8px 18px',
                background: '#1a7a45',
                border: 'none',
                borderRadius: 6,
                color: '#fff',
                cursor: filteredRows.length ? 'pointer' : 'not-allowed',
                fontSize: 13,
                fontWeight: 600,
                opacity: filteredRows.length ? 1 : 0.6,
              }}
            >
              Download
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          border: '1px solid #e8e8e8',
          overflow: 'hidden',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ overflowX: 'auto', flex: 1 }}>
          <table style={{ width: '100%', minWidth: 1300, borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: colors.tableBg }}>
                <th style={{ width: 56, padding: '11px 12px' }} />
                {['Copack Code', 'Copack Description', 'Case per Pallet', 'Batch Size 1', 'Batch Size 2', 'Rule', 'Code Type', 'Output Rate', 'Safety Stock', 'Line', 'Lead Time (Days)', 'Production Max', 'Donor Code', 'Usage Status'].map((header) => (
                  <th
                    key={header}
                    style={{
                      padding: '11px 12px',
                      textAlign: 'left',
                      color: colors.tableHeaderText,
                      fontWeight: 700,
                      fontSize: 12.5,
                      whiteSpace: 'nowrap',
                      borderBottom: '1px solid #dde0f0',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={11} style={{ padding: '18px 12px', textAlign: 'center', color: '#777' }}>
                    No rows match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, index) => {
                  const isSelected = row.code === selectedCode;
                  const background = isSelected ? '#f0f2ff' : index % 2 === 0 ? '#fff' : '#fafafa';

                  return (
                    <tr key={row.code} style={{ background }}>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <button
                          type="button"
                          aria-label={`Select ${row.code}`}
                          aria-pressed={isSelected}
                          onClick={() => handleSelectRow(row.code)}
                          style={{
                            width: 18,
                            height: 18,
                            borderRadius: '50%',
                            border: '2px solid #aaa',
                            background: isSelected ? colors.sidebarActive : 'transparent',
                            cursor: 'pointer',
                          }}
                        />
                      </td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{row.code}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{row.desc}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.cpp}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.b1}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.b2}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.rule}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{row.type}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.rate}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.safetyStock ?? 'N/A'}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.line ?? 'N/A'}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.leadTimeDays ?? 'N/A'}</td>
                      <td style={{ padding: '10px 12px', textAlign: 'center', color: '#333' }}>{row.productionMax ?? 'N/A'}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{row.donorCode ?? 'N/A'}</td>
                      <td style={{ padding: '10px 12px', color: '#333' }}>{row.usageStatus ?? 'N/A'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '10px 16px',
            borderTop: '1px solid #eee',
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={handleShowDetails}
            disabled={!selected}
            style={{
              padding: '6px 12px',
              borderRadius: 4,
              border: 'none',
              background: selected ? '#b8b8b8' : '#d7d7d7',
              color: '#fff',
              cursor: selected ? 'pointer' : 'not-allowed',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            Show details
          </button>
          <span style={{ fontSize: 12, color: '#666' }}>
            Showing <strong>1-{filteredRows.length}</strong> of <strong>{rows.length}</strong> items
          </span>
          {['<', '<', '1', '2', '3', '>', '>'].map((page, index) => (
            <button
              type="button"
              key={`${page}-${index}`}
              style={{
                width: 22,
                height: 22,
                borderRadius: 4,
                border: '1px solid #f1b980',
                background: page === '1' ? '#fff5ec' : '#fff',
                color: '#f5821f',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={detailsRef}
        style={{
          background: '#fff',
          borderRadius: 8,
          border: `1.5px solid ${isEditing ? colors.sidebarActive : '#e8e8e8'}`,
          padding: '20px 24px',
          transition: 'border-color 0.2s',
          flex: 1,
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700, color: colors.textDark, flex: 1 }}>
            Copack Details
          </h3>
          {isEditing && (
            <span
              style={{
                fontSize: 12,
                color: colors.sidebarActive,
                fontWeight: 600,
                background: '#f0f2ff',
                padding: '3px 10px',
                borderRadius: 20,
              }}
            >
              Editing mode
            </span>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 40px' }}>
          {DETAIL_FIELDS.map(([label1, key1, label2, key2], index) => (
            <div key={index} style={{ display: 'contents' }}>
              <div>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{label1}</div>
                <input
                  readOnly={!isEditing || !key1}
                  value={key1 && selected ? selected[key1] ?? '' : ''}
                  onChange={(e) => handleFieldChange(key1, e.target.value)}
                  style={getInputStyle(Boolean(key1))}
                />
              </div>
              {label2 ? (
                <div>
                  <div style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>{label2}</div>
                  <input
                    readOnly={!isEditing || !key2}
                    value={key2 && selected ? selected[key2] ?? '' : ''}
                    onChange={(e) => handleFieldChange(key2, e.target.value)}
                    style={getInputStyle(Boolean(key2))}
                  />
                </div>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
          <button
            type="button"
            disabled
            title="BOM details are not implemented yet"
            style={{
              padding: '8px 18px',
              border: '1px solid #ddd',
              borderRadius: 6,
              background: '#fff',
              cursor: 'not-allowed',
              fontSize: 13,
              color: '#999',
            }}
          >
            BOM Data
          </button>

          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelEdit}
                style={{
                  padding: '8px 18px',
                  border: '1.5px solid #ccc',
                  borderRadius: 6,
                  background: '#fff',
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#555',
                  fontWeight: 600,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                style={{
                  padding: '8px 18px',
                  border: 'none',
                  borderRadius: 6,
                  background: '#1a7a45',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Save
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={selectedCode ? handleStartEdit : undefined}
              disabled={!selectedCode}
              title={selectedCode ? 'Edit selected row' : 'Select a row first'}
              style={{
                padding: '8px 18px',
                border: 'none',
                borderRadius: 6,
                background: selectedCode ? colors.sidebarActive : '#b0b4d0',
                color: '#fff',
                cursor: selectedCode ? 'pointer' : 'not-allowed',
                fontSize: 13,
                fontWeight: 600,
                transition: 'background 0.2s',
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MasterDataPage;
