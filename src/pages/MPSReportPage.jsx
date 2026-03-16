import { useEffect, useMemo, useState } from 'react';
import colors from '../constants/colors';
import Dropdown from '../components/ui/Dropdown';

const REPORT_WEEKS = [
  '25P10W3',
  '25P10W4',
  '25P11W1',
  '25P11W2',
  '25P11W3',
  '25P11W4',
  '25P12W1',
  '25P12W2',
  '25P12W3',
  '25P12W4',
];

const REPORT_ROWS = [
  {
    code: '10071863',
    description: 'SNICKERS FUNSIZE\nCOSTCO 12*1361G',
    casePerPallet: '180\n(8.33)\nSafety Stock: 3',
    brand: 'Snickers',
    copackCode: '10071863',
    values: {
      onHand: ['300', '', '', '', '', '', '', '', '', ''],
      demand: ['20', '33', '24', '24', '24', '24', '25', '25', '25', '25'],
      production: ['0', '0', '0', '0', '0', '0', '0', '0', '0', '100'],
      balance: ['200', '247', '223', '199', '175', '151', '126', '101', '76', '231'],
    },
  },
  {
    code: '10107227',
    description: 'CES TERRINE OF\nBFCHDILL 8*\n(3*100G)',
    casePerPallet: '224\n(66.78)\nSafety Stock: 2',
    brand: 'Cesar',
    copackCode: '10107227',
    values: {
      onHand: ['169', '', '', '', '', '', '', '', '', ''],
      demand: ['90', '49', '37', '37', '37', '37', '100', '100', '100', '100'],
      production: ['0', '0', '0', '0', '0', '224', '0', '0', '0', '0'],
      balance: ['129', '80', '267', '230', '193', '360', '260', '404', '304', '204'],
    },
  },
  {
    code: '10107228',
    description: 'CESAR BEEF &\nCHEESE 24*100G',
    casePerPallet: '224\n(53.69)\nSafety Stock: 2',
    brand: 'Cesar',
    copackCode: '10107228',
    values: {
      onHand: ['142', '', '', '', '', '', '', '', '', ''],
      demand: ['58', '63', '62', '62', '62', '62', '93', '93', '93', '93'],
      production: ['0', '224', '0', '0', '224', '0', '224', '0', '0', '224'],
      balance: ['104', '265', '203', '141', '303', '241', '372', '279', '156', '931'],
    },
  },
  {
    code: '10300111',
    description: 'MARS BAR\n(20*50G)',
    casePerPallet: '200\n(40.00)\nSafety Stock: 3',
    brand: 'Mars',
    copackCode: '10300111',
    values: {
      onHand: ['89', '', '', '', '', '', '', '', '', ''],
      demand: ['20', '20', '20', '20', '20', '20', '20', '20', '20', '20'],
      production: ['0', '0', '100', '0', '0', '140', '0', '0', '0', '0'],
      balance: ['69', '49', '129', '109', '89', '229', '209', '189', '169', '149'],
    },
  },
  {
    code: '10300112',
    description: 'SNICKERS NUT\n(15*50G)',
    casePerPallet: '210\n(42.00)\nSafety Stock: 2',
    brand: 'Snickers',
    copackCode: '10300112',
    values: {
      onHand: ['120', '', '', '', '', '', '', '', '', ''],
      demand: ['40', '45', '50', '40', '45', '50', '45', '40', '45', '50'],
      production: ['0', '0', '0', '100', '0', '0', '90', '0', '0', '110'],
      balance: ['80', '35', '35', '95', '50', '0', '45', '5', '50', '110'],
    },
  },
  {
    code: '10300233',
    description: 'M&MS POUCH\n(30*100G)',
    casePerPallet: '240\n(48.00)\nSafety Stock: 4',
    brand: 'M&M',
    copackCode: '10300233',
    values: {
      onHand: ['250', '', '', '', '', '', '', '', '', ''],
      demand: ['25', '25', '25', '25', '25', '25', '25', '25', '25', '25'],
      production: ['0', '0', '0', '0', '0', '0', '200', '0', '0', '0'],
      balance: ['225', '200', '175', '150', '125', '100', '275', '250', '225', '200'],
    },
  },
];

const PARAMETER_ROWS = [
  { key: 'onHand', label: 'On-Hand' },
  { key: 'demand', label: 'Demand' },
  { key: 'production', label: 'Production' },
  { key: 'balance', label: 'Balance' },
];

const buildCsvValue = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

const MPSReportPage = () => {
  const [planNumber, setPlanNumber] = useState('');
  const [batchSize, setBatchSize] = useState('Batch Size 1');
  const [brand, setBrand] = useState('All');
  const [copackCode, setCopackCode] = useState('All');
  const [searchValue, setSearchValue] = useState('');

  const [isEditingProduction, setIsEditingProduction] = useState(false);

  // rows from API (fall back to REPORT_ROWS constant if needed)
  const [reportRows, setReportRows] = useState(REPORT_ROWS);

  useEffect(() => {
    const base = import.meta.env.VITE_API_BASE || 'http://localhost:8000/api';
    if (!import.meta.env.VITE_API_BASE) {
      console.warn('VITE_API_BASE not defined; defaulting to', base);
    }
    fetch(`${base}/mpsreport/`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setReportRows(data);
        }
      })
      .catch((err) => {
        console.error('Error loading MPS report rows', err);
      });
  }, []);

  const brandOptions = useMemo(() => ['All', ...new Set(reportRows.map((item) => item.brand))], [reportRows]);
  const copackOptions = useMemo(() => ['All', ...new Set(reportRows.map((item) => item.copackCode))], [reportRows]);

  const visibleRows = useMemo(
    () =>
      reportRows.filter((row) => {
        const matchesBrand = brand === 'All' || row.brand === brand;
        const matchesCopack = copackCode === 'All' || row.copackCode === copackCode;
        const searchTarget = `${row.code} ${row.description}`.toLowerCase();
        const matchesSearch = !searchValue || searchTarget.includes(searchValue.toLowerCase());

        return matchesBrand && matchesCopack && matchesSearch;
      }),
    [brand, copackCode, searchValue, reportRows],
  );

  const handleReset = () => {
    setPlanNumber('');
    setBatchSize('Batch Size 1');
    setBrand('All');
    setCopackCode('All');
    setSearchValue('');
  };

  const handleProductionChange = (rowCode, weekIndex, value) => {
    setReportRows((prevRows) =>
      prevRows.map((row) => {
        if (row.code !== rowCode) return row;
        const newProduction = [...row.values.production];
        newProduction[weekIndex] = value;
        return { ...row, values: { ...row.values, production: newProduction } };
      }),
    );
  };

  const handleToggleEdit = () => {
    setIsEditingProduction((old) => !old);
  };

  const handleSaveProduction = () => {
    setIsEditingProduction(false);
  };

  const handleDownload = () => {
    const columns = ['copackCode', 'description', 'casePerPallet', 'parameter', ...REPORT_WEEKS];
    const csvRows = visibleRows.flatMap((row) =>
      PARAMETER_ROWS.map((parameter) => [
        row.code,
        row.description.replace(/\n/g, ' '),
        row.casePerPallet.replace(/\n/g, ' '),
        parameter.label,
        ...row.values[parameter.key],
      ]),
    );

    const csv = [columns.join(','), ...csvRows.map((row) => row.map(buildCsvValue).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'mps-report.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '12px 12px 16px', background: colors.contentBg, minHeight: '100%' }}>
      <h2 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700, color: '#111' }}>MPS Report</h2>

      <div
        style={{
          background: '#fff',
          borderRadius: 4,
          border: '1px solid #d0d0d0',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '10px 12px', borderBottom: '1px solid #d9d9d9' }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div>
              <label htmlFor="mps-plan-number" style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 700 }}>
                Plan Number
              </label>
              <Dropdown
                id="mps-plan-number"
                label="Select"
                value={planNumber}
                options={['Plan-001', 'Plan-002', 'Plan-003']}
                onChange={setPlanNumber}
                width={138}
              />
            </div>
            <div>
              <label htmlFor="mps-batch-size" style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 700 }}>
                Batch Size
              </label>
              <Dropdown
                id="mps-batch-size"
                label="Batch Size 1"
                value={batchSize}
                options={['Batch Size 1', 'Batch Size 2', 'Batch Size 3']}
                onChange={setBatchSize}
                width={138}
              />
            </div>
            <div>
              <label htmlFor="mps-brand" style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 700 }}>
                Brand
              </label>
              <Dropdown id="mps-brand" label="All" value={brand} options={brandOptions} onChange={setBrand} width={138} />
            </div>
            <div>
              <label htmlFor="mps-copack" style={{ display: 'block', marginBottom: 6, fontSize: 12, fontWeight: 700 }}>
                Copack Code
              </label>
              <Dropdown
                id="mps-copack"
                label="All"
                value={copackCode}
                options={copackOptions}
                onChange={setCopackCode}
                width={154}
              />
            </div>
            <button
              type="button"
              onClick={handleReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                height: 28,
                padding: '0 14px',
                borderRadius: 4,
                border: '1px solid #ff9d2f',
                background: '#fff',
                color: '#ff7a00',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Reset Filter
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 12,
            padding: '12px',
          }}
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search"
            style={{
              width: 232,
              height: 28,
              borderRadius: 18,
              border: '1px solid #c7c7c7',
              padding: '0 14px',
              fontSize: 12,
              color: '#555',
            }}
          />

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              type="button"
              style={{
                height: 28,
                padding: '0 12px',
                borderRadius: 3,
                border: 'none',
                background: '#ff8a00',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Save Plan
            </button>
            <button
              type="button"
              onClick={handleToggleEdit}
              style={{
                height: 28,
                padding: '0 12px',
                borderRadius: 3,
                border: 'none',
                background: isEditingProduction ? '#4a4f59' : '#ff8a00',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              {isEditingProduction ? 'Cancel Edit' : 'Edit'}
            </button>
            {isEditingProduction && (
              <button
                type="button"
                onClick={handleSaveProduction}
                style={{
                  height: 28,
                  padding: '0 12px',
                  borderRadius: 3,
                  border: 'none',
                  background: '#0f7a37',
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Save Production
              </button>
            )}
            <button
              type="button"
              onClick={handleDownload}
              style={{
                height: 28,
                padding: '0 14px',
                borderRadius: 3,
                border: 'none',
                background: '#14833b',
                color: '#fff',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Download
            </button>
          </div>
        </div>

        <div style={{ padding: '0 12px 8px' }}>
          <div style={{ overflowX: 'auto', border: '1px solid #d2d2d2', borderBottom: 'none', maxHeight: 380, overflowY: 'auto' }}>
            <table style={{ width: '100%', minWidth: 1180, borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: '#d7d9e7', color: '#1120b3' }}>
                  {['Copack Code', 'Copack Description', 'Case per Pallet', 'Planning Parameters', ...REPORT_WEEKS].map((header) => (
                    <th
                      key={header}
                      style={{
                        padding: '12px 10px',
                        borderRight: '1px solid #c9c9c9',
                        textAlign: 'center',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.length === 0 ? (
                  <tr>
                    <td colSpan={14} style={{ padding: '20px 12px', textAlign: 'center', color: '#666' }}>
                      No report rows match the selected filters.
                    </td>
                  </tr>
                ) : (
                  visibleRows.map((row) =>
                    PARAMETER_ROWS.map((parameter, parameterIndex) => (
                      <tr key={`${row.code}-${parameter.key}`} style={{ background: parameter.key === 'balance' ? '#a9ddd5' : '#fff' }}>
                        {parameterIndex === 0 && (
                          <>
                            <td
                              rowSpan={4}
                              style={{
                                width: 110,
                                padding: '14px 12px',
                                borderRight: '1px solid #c9c9c9',
                                borderBottom: '1px solid #c9c9c9',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                              }}
                            >
                              {row.code}
                            </td>
                            <td
                              rowSpan={4}
                              style={{
                                width: 160,
                                padding: '14px 12px',
                                borderRight: '1px solid #c9c9c9',
                                borderBottom: '1px solid #c9c9c9',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {row.description}
                            </td>
                            <td
                              rowSpan={4}
                              style={{
                                width: 120,
                                padding: '14px 12px',
                                borderRight: '1px solid #c9c9c9',
                                borderBottom: '1px solid #c9c9c9',
                                textAlign: 'center',
                                verticalAlign: 'middle',
                                whiteSpace: 'pre-line',
                              }}
                            >
                              {row.casePerPallet}
                            </td>
                          </>
                        )}
                        <td
                          style={{
                            padding: '10px 12px',
                            borderRight: '1px solid #c9c9c9',
                            borderBottom: '1px solid #c9c9c9',
                            textAlign: 'center',
                            minWidth: 120,
                          }}
                        >
                          {parameter.label}
                        </td>
                        {row.values[parameter.key].map((value, index) => (
                          <td
                            key={`${row.code}-${parameter.key}-${REPORT_WEEKS[index]}`}
                            style={{
                              padding: '10px 12px',
                              borderRight: '1px solid #c9c9c9',
                              borderBottom: '1px solid #c9c9c9',
                              textAlign: 'center',
                              fontWeight: parameter.key === 'balance' ? 700 : 400,
                            }}
                          >
                            {isEditingProduction && parameter.key === 'production' ? (
                              <input
                                type="text"
                                value={value}
                                onChange={(e) => handleProductionChange(row.code, index, e.target.value)}
                                style={{
                                  width: 60,
                                  borderRadius: 4,
                                  border: '1px solid #ccc',
                                  padding: '3px 4px',
                                  fontSize: 11,
                                  textAlign: 'center',
                                }}
                              />
                            ) : (
                              value || '0'
                            )}
                          </td>
                        ))}
                      </tr>
                    )),
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px 12px',
            fontSize: 12,
            color: '#444',
          }}
        >
          <span>
            Showing <strong style={{ color: '#ff7a00' }}>1-12</strong> of <strong style={{ color: '#ff7a00' }}>200</strong> items
          </span>
          {['<', '<', '1', '2', '3', '4', '5', '>', '>'].map((page, index) => (
            <button
              type="button"
              key={`${page}-${index}`}
              style={{
                width: 20,
                height: 20,
                borderRadius: 4,
                border: '1px solid #f1b980',
                background: page === '1' ? '#fff2e4' : '#fff',
                color: page === '1' ? '#ff7a00' : '#c7852b',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MPSReportPage;
