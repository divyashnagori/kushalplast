const fs = require('fs');
const path = require('path');

const filesToMinify = [
    { input: 'css/kushal.css', output: 'css/kushal.min.css' },
    { input: 'css/style.css', output: 'css/style.min.css' },
    { input: 'js/script.js', output: 'js/script.min.js' },
    { input: 'js/products.js', output: 'js/products.min.js' }
];

filesToMinify.forEach(file => {
    try {
        const inputPath = path.join(__dirname, file.input);
        const outputPath = path.join(__dirname, file.output);

        let content = fs.readFileSync(inputPath, 'utf8');

        if (file.input.endsWith('.css')) {
            // Remove comments
            content = content.replace(/\/\*[\s\S]*?\*\//g, '');
            // Remove whitespace
            content = content.replace(/\s+/g, ' ').replace(/\s*([{}:;,])\s*/g, '$1').trim();
        } else if (file.input.endsWith('.js')) {
            // Simple JS minification (remove comments/whitespace safely?)
            // This is risky with regex. Just removing // comments and whitespace around braces
            content = content.replace(/\/\/.*$/gm, '') // Remove line comments
                .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
                .replace(/\s+/g, ' '); // Collapse whitespace (Risky for strings, but likely ok for this simple script)
            // Safer: Just keep it simple or use a library if we had one. 
            // Better: Just Copy it for now if we can't safely minify without tools. 
            // actually this regex `replace(/\s+/g, ' ')` will break strings containing spaces.

            // let's do a very mild minification: remove comments and trim lines
            content = fs.readFileSync(inputPath, 'utf8')
                .replace(/\/\/.*$/gm, '')
                .replace(/\/\*[\s\S]*?\*\//g, '')
                .split('\n').map(line => line.trim()).filter(line => line).join('');
        }

        fs.writeFileSync(outputPath, content);
        console.log(`Minified ${file.input} -> ${file.output}`);
    } catch (err) {
        console.error(`Error processing ${file.input}:`, err);
    }
});
