// var sourceID = "ssx99";
// var sinkID = "dsf423";

// //If sinkBrowser is already paired to sourceBrowser
// chrome.storage.local.set({sinkID:"ALREADY_PAIRED"},()=>{});

// chrome.storage.local.get(sinkID,(items)=>{
//   console.log(items[sinkID]);  //Prints already paired or not
// });



// chrome.tabs.query({active: true, lastFocusedWindow: true}, async (tabs) => {
//     let url = tabs[0].url;
//     document.querySelector("h6").textContent = url;

//     const params = new URLSearchParams();
//     params.append("sourceBrowserID","ssx99");
//     params.append("sinkBrowserID","dsf423")
//     params.append("link",url);

//     chrome.storage.local.get(sinkID,(items)=>{
//       if(items[])
//     });
    
//     try{
//       await fetch('http://localhost:3000/api/post',{
//         mode:'no-cors',
//         method:'POST',
//         body:params
//       }).then(res => {
//         document.querySelector("h5").textContent = "Sent!";
//       });
//     }
//  ch(error){
//       console.log(error);
//     }
// }); 

