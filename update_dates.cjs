const fs = require('fs');

// Read the Gallery1040.tsx file
let content = fs.readFileSync('src/Gallery1040.tsx', 'utf8');

// Date mappings based on folder names
const dateMap = {
  '250731': 'July 31, 2025',
  '250724': 'July 24, 2025', 
  '250710': 'July 10, 2025',
  '250618': 'June 18, 2025',
  '250612': 'June 12, 2025',
  '250522': 'May 22, 2025',
  '250508_250515': 'May 8-15, 2025'
};

// Update dates based on folder patterns
for (const [folder, date] of Object.entries(dateMap)) {
  // Create regex to match lines with this folder
  const regex = new RegExp(`{ filename: "${folder}/[^"]+", date: "[^"]+" }`, 'g');
  content = content.replace(regex, (match) => {
    return match.replace(/, date: "[^"]+"/, `, date: "${date}"`);
  });
}

// Update section comments
content = content.replace('// July 2025 - Latest Progress (End of July)', '// July 31, 2025 - Latest Progress');
content = content.replace('// July 2025 - Latest Progress (Late July)', '// July 24, 2025 - Progress Update');
content = content.replace('// July 2025 - Latest Progress', '// July 10, 2025 - Windows and Framing');
content = content.replace('// June 2025 - Windows and Electrical', '// June 18, 2025 - Windows and Electrical');
content = content.replace('// June 2025 - Library and Framing', '// June 12, 2025 - Library and Framing');
content = content.replace('// May 2025 - Framing Progress', '// May 22, 2025 - Framing Progress');
content = content.replace('// May 2025 - Initial Work', '// May 8-15, 2025 - Initial Work');

// Write the updated file
fs.writeFileSync('src/Gallery1040.tsx', content);
console.log('Dates updated successfully!');