export const environment = {
    production: false,
    apiUrl: 'https://localhost:7125/api',
    disablePdfDownload:false,
    dateTimeFormat: 'dd MMM, yyyy hh:mm a',
    dateFormat: 'dd MMM, yyyy',
    dateLocale: 'en-US',
    manifest: {
      appTitle: 'HRMS',
      appVersion: '1.0',
      angularVersion: '1.0',
      agGridVersion: '1.0',
      ngZorroVersion: '1.0',
      gitVersion: 'localbuild',
      buildTimestamp: new Date().toISOString().replace(/-/g, '').replace(/:/g, '').replace(/T/g, '').split('.',1)[0]
    }
  };