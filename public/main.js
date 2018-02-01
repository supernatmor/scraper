$.getJSON("/articles", (data)=>{
    for(let i = ; i < data.length; i ++){
        $("#articles").append("")
    }
})