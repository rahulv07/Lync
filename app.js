chrome.tabs.query({active: true, lastFocusedWindow: true}, async (tabs) => {
    let url = tabs[0].url;
    document.querySelector("h6").textContent = url;

    const params = new URLSearchParams();
    params.append("browserID","as3ww241qa3");
    params.append("link",url);

    try{
      await fetch('http://localhost:3000/api/post',{
        mode:'no-cors',
        method:'POST',
        body:params
      }).then(res => {
        document.querySelector("h5").textContent = "Sent!";
      });
    }
    catch(error){
      console.log(error);
    }
}); 

