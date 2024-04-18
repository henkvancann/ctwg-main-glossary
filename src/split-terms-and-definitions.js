module.exports = function () {
  const fs = require('fs');
  const path = require('path');
  const fixUp = require('./fix-content.js');


  // config
  const config = {
    glossaryFileName: 'terms_and_definitions.md', // This is the file that will be split up
    splitString: '[[def:' // This is the string that indicates the start of a definition
  };

  fixUp.fixGlossaryFile();

  // Restore original
  fs.copyFileSync(path.join('specs.unsplit.json'), path.join('specs.json'));


  const specs = require('../specs.json');
  // remove config.glossaryFileName from specs.specs[0].markdown_paths
  let insertPosition = specs.specs[0].markdown_paths.indexOf(config.glossaryFileName);

  specs.specs[0].markdown_paths.splice(insertPosition, 1);

  const glossaryFile = path.join(specs.specs[0].spec_directory, config.glossaryFileName);
  const glossaryFileContent = fs.readFileSync(glossaryFile, 'utf8');
  const splittedFilesLocationFull = path.join(specs.specs[0].spec_directory, specs.specs[0].markdown_splitted_files_dir, '/');


  function createSplittedFilesDirectory() {
    const directoryPath = path.join(specs.specs[0].spec_directory, specs.specs[0].markdown_splitted_files_dir, '/');

    // Remove directory with the splitted files if it exists
    if (fs.existsSync(directoryPath)) {
      fs.rmdirSync(directoryPath, { recursive: true });
    }

    // Create directory with the splitted files if it doesn't exist
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
  }

  function insertGlossaryFileName(array, string) {
    array.splice(insertPosition, 0, string);
    insertPosition++;
    return array;
  }

  const regex = /\[\[def: (.*?)\]\]/g;
  const matches = [...glossaryFileContent.matchAll(regex)];



  // Extract terms
  const terms = matches.map(match => match[1]);

  // Make filenames from terms
  let fileNames = terms.map(term => {
    return `${term.replace(/,/g, '-').replace(/\//g, '-').replace(/ /g, '-').toLowerCase()}`;
  });

  fileNames.sort();


  // // BEGIN Not used at the moment.

  // // write fileNames to a file
  // fs.writeFileSync("./fileNames.txt", fileNames.join("\n"));

  // // END Not used at the moment.

  // deduplicate fileNames
  fileNamesDeduplicated = [...new Set(fileNames)];

  // // BEGIN Not used at the moment.
  // fs.writeFileSync("./fileNamesDeduplicated.txt", fileNamesDeduplicated.join("\n"));

  // function findUniqueElementsWithCount(array1, array2) {
  //   // Function to count occurrences of each element in the array
  //   const countElements = (array) => {
  //     return array.reduce((acc, curr) => {
  //       acc[curr] = (acc[curr] || 0) + 1;
  //       return acc;
  //     }, {});
  //   };

  //   // Count elements in both arrays
  //   const count1 = countElements(array1);
  //   const count2 = countElements(array2);

  //   // Function to find differences in counts
  //   const findDifferences = (counts1, counts2) => {
  //     const differences = {};
  //     // Iterate over counts1 to find elements not in counts2 or with different counts
  //     Object.keys(counts1).forEach(key => {
  //       if (!counts2[key] || counts1[key] > counts2[key]) {
  //         differences[key] = counts1[key] - (counts2[key] || 0);
  //       }
  //     });
  //     return differences;
  //   };

  //   // Find differences from both perspectives
  //   const uniqueInFirst = findDifferences(count1, count2);
  //   const uniqueInSecond = findDifferences(count2, count1);

  //   // Combine results and return
  //   return {
  //     uniqueInFirst,
  //     uniqueInSecond
  //   };
  // }

  // const uniqueElementsWithCount = findUniqueElementsWithCount(fileNames, fileNamesDeduplicated);
  // // END Not used at the moment.


  function splitContentIntoFiles(content) {
    const sections = content.split(config.splitString).slice(1); // slice(1) to remove the first part before the first heading

    // // save the first part before the first heading into a variable …
    // let glossaryIntro = content.split(config.splitString)[0];

    // // … and write this variable to disk.
    // fs.writeFileSync(path.join(specs.specs[0].spec_directory, "glossaryIntro.md"), glossaryIntro);

    sections.forEach((section, index) => {
      let filename = '';
      if (terms[index]) {
        filename = `${fileNamesDeduplicated[index]}.md`;

        // Write separate files to disk
        fs.writeFileSync("./" + splittedFilesLocationFull + filename, config.splitString + section);

        // Add file path to specs
        insertGlossaryFileName(specs.specs[0].markdown_paths, path.join(specs.specs[0].markdown_splitted_files_dir, '/', filename));
      }
    });

    // make string from specs for writing to file
    const specsString = JSON.stringify(specs);
    fs.writeFileSync("./specs.json", specsString);
  }


  insertGlossaryFileName(specs.specs[0].markdown_paths, "glossaryIntro.md");
  createSplittedFilesDirectory();
  splitContentIntoFiles(glossaryFileContent);
};