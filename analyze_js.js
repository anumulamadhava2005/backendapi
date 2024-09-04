const { ESLint } = require('eslint');
const fs = require('fs');

async function analyzeCode(code) {
    try {
        // Save the code to a temporary file
        fs.writeFileSync('temp_code.js', code);

        const eslint = new ESLint({
            cwd: process.cwd(), // Ensure ESLint uses the current working directory for configuration
        });

        const results = await eslint.lintFiles('temp_code.js');

        // Log the ESLint results
        console.log('ESLint results:', JSON.stringify(results, null, 2));
        return results;
    } catch (error) {
        console.error('Error in analyzeCode function:', error);
        throw error;
    }
}

process.stdin.on('data', async (data) => {
    try {
        const code = data.toString();
        const eslintReport = await analyzeCode(code);
        console.log(JSON.stringify(eslintReport, null, 2));
    } catch (error) {
        console.error('Error processing stdin data:', error);
    }
});
