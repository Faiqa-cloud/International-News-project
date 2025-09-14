const api ="98a81b6cc2504a4e8c405eedd75ad049"
const url = "https://newsapi.org/v2/everything?q="

 window.addEventListener('load',()=> getnew('Pakistan'))

async function getnew(info) {
        const neew = await fetch(`${url}${info}&apiKey=${api}`)
    const gn = await neew.json()
     bindData(gn.articles)
    console.log(gn); 
}
function bindData(articles){
    const largercon = document.querySelector('.largercontainer')
    const tempcard = document.querySelector('.temp-card')

    largercon.innerHTML = " "
    articles.forEach(article => {
        if(!article.urlToImage)  return
        const clone = tempcard.content.cloneNode(true)
        getimgdata(clone,article)
        clone.firstElementChild.addEventListener('click',()=>{
            // console.log(article.url);
            
        window.open(article.url, "_blank")
})

        largercon.appendChild(clone)    
    })

}
function getimgdata(clone, article){
    const imgsrc = clone.querySelector('#new-img')
    const h3 = clone.querySelector('#h3')
    const h6 = clone.querySelector('#h6')
    const p = clone.querySelector('#p')

    imgsrc.src = article.urlToImage
    h3.innerHTML = article.title
    p.innerHTML = article.description

    const date = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:'Asia/Karachi'
    })

    h6.innerHTML = `${article.source.name} . ${date}`
    
}

let select =null;

function section (sec){
    let highlight = document.querySelector('.'+sec)
    select?.classList.remove('active')
    select = highlight
    select.classList.add('active')
    if(sec==='education'){
        return getnew('education')
    }
    else if(sec==='pol'){
        return getnew('politics')
    }
    else if(sec==='hel'){
        return getnew('health')

    }
}
  
const edulist = document.querySelector('.education').addEventListener('click',()=> section('education'))
const pollist =document.querySelector('.pol').addEventListener('click', ()=> section('pol'))
const hellist =document.querySelector('.hel').addEventListener('click', ()=> section('hel'))

const search = document.querySelector('.search')
const btn = document.querySelector('.btn')

btn.addEventListener('click',()=>{
    const text =search.value
    if(!text) return
    getnew(text)
    select?.classList.remove('active')
    select = null;
})
const href = document.querySelector('.href').addEventListener('click',()=>{
    window.location.reload()
})