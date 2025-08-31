const { exec } = require('child_process');
const path = require('path');
const glob = require('glob');

// Define paths using Node's path module
const reportDir = path.join(__dirname, 'cypress', 'reports');
const jsonPattern = path.join(reportDir, 'mochawesome.json');  // Match mochawesome.json file
const mergedReportPath = path.join(reportDir, 'mochawesome.json');  // Output the merged result in mochawesome.json

// Use glob.sync to find the mochawesome.json file
console.log('Looking for JSON files in:', jsonPattern);  // Log the pattern being searched
const files = glob.sync(jsonPattern);

console.log('Found JSON files:', files);  // Log the found files for debugging

if (files.length === 0) {
  console.log('⚠️ No JSON files found to merge.');
  process.exit(0);
}

// Skip merging if only one file is found (no need to merge one file)
if (files.length === 1) {
  console.log('Single JSON file found, generating the HTML report...');
  exec(`npx mochawesome-report-generator ${files[0]} --reportDir ${reportDir}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Error generating report: ${err}`);
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log('🎉 HTML report generated successfully.');
  });
  return;
}

// Merge the JSON files if there are multiple files
const filesList = files.join(' ');
console.log('Merging the following files:', filesList); // Log the files to be merged

exec(`npx mochawesome-merge ${filesList} > ${mergedReportPath}`, (err, stdout, stderr) => {
  if (err) {
    console.error(`❌ Error merging reports: ${err}`);
    return;
  }
  console.log('✅ Reports merged successfully.');

  // Generate the Mochawesome HTML report
  exec(`npx mochawesome-report-generator ${mergedReportPath} --reportDir ${reportDir}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`❌ Error generating report: ${err}`);
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log('🎉 HTML report generated successfully.');
  });
});
