import { useMemo, useState } from 'react';
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

  const brandOptions = useMemo(() => ['All', ...new Set(REPORT_ROWS.map((item) => item.brand))], []);
  const copackOptions = useMemo(() => ['All', ...new Set(REPORT_ROWS.map((item) => item.copackCode))], []);

  const visibleRows = useMemo(
    () =>
      REPORT_ROWS.filter((row) => {
        const matchesBrand = brand === 'All' || row.brand === brand;
        const matchesCopack = copackCode === 'All' || row.copackCode === copackCode;
        const searchTarget = `${row.code} ${row.description}`.toLowerCase();
        const matchesSearch = !searchValue || searchTarget.includes(searchValue.toLowerCase());

        return matchesBrand && matchesCopack && matchesSearch;
      }),
    [brand, copackCode, searchValue],
  );

  const handleReset = () => {
    setPlanNumber('');
    setBatchSize('Batch Size 1');
    setBrand('All');
    setCopackCode('All');
    setSearchValue('');
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
              Edit
            </button>
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
          <div style={{ overflowX: 'auto', border: '1px solid #d2d2d2', borderBottom: 'none' }}>
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
                            {value}
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
