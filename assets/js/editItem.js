/*
  Author: Kor Dwarshuis, kor@dwarshuis.com
  Created: 2024-04-11
  Description: 
   ---
*/

function editItem() {
   /*****************/
   /* CONFIGURATION */


   /* END CONFIGURATION */
   /*********************/

   // find the definition list that is the next sibling of #terms-definitions
   const termsDefinitions = document.querySelector('#terms-definitions ~ dl');
   console.log('termsDefinitions: ', termsDefinitions);

   termsDefinitions.querySelectorAll('dt').forEach(term => {
      const nextElementSibling = term.nextElementSibling;

      nextElementSibling.innerHTML += `<a style="border: 1px solid grey; border-radius: 10px;display: inline-block;text-decoration: none;" href="https://github.com/kordwarshuis/ctwg-main-glossary/blob/main/spec/splitted_files/${term.innerText}.replace(/,/g, '-').replace(/\//g, '-').replace(/ /g, '-').toLowerCase()" class="edit-item">Edit ${term.innerText}</a>`;
   });

}

document.addEventListener("DOMContentLoaded", function () {
   editItem();
});
