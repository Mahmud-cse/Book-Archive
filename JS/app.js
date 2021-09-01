document.getElementById('error').style.display='none';
document.getElementById('spinner').style.display='none';
document.getElementById('result').style.display='none';

// toggle
const toggleSpinner=value=>{
    document.getElementById('spinner').style.display=value;
}
const toggleSearch=value=>{
    document.getElementById('card').style.display=value;
}
const toggleResult=value=>{
    document.getElementById('result').style.display=value;
}

// search
const searchBook=()=>{
    const search=document.getElementById('search');
    const searchText=search.value;
    search.value='';
    document.getElementById('error').style.display='none';

// condition
    if(searchText===''){
        document.getElementById('error').style.display='block';
        document.getElementById('card').style.display='none';
        toggleResult('none');
    }else{
        toggleSpinner('block');
        toggleSearch('none');
        toggleResult('none');
        const url=`https://openlibrary.org/search.json?q=${searchText}`;
        fetch(url)
        .then(res=>res.json())
        .then(data=>displayData(data.docs));
    }
}

// display
const displayData=(value)=>{
    if(value.length===0){
        toggleSpinner('none');
        document.getElementById('error').style.display='block';
    }else{
    const card=document.getElementById('card');
    card.textContent='';
    let count=0;

// forEach
    value?.forEach(data=>{
        const div=document.createElement('div');
        div.classList.add('col');
        count++;
        div.innerHTML=`
        <div class="card h-100">
        <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-M.jpg" class="card-img-top" alt="..." height="500">
            <div class="card-body">
                <h3 class="card-title">${data.title}</h3>
                <h4 class="card-title">${data.author_name}</h4>
                <h5 class="card-title">${data.first_publish_year}</h5>
            </div>
        </div>
        `;
        card.appendChild(div);
       const add=document.getElementById('result');
       add.innerHTML=`
       <h4 class="m-5 text-center border-top">Total Search Result: ${count}</h4>;
       `;
    });
    toggleSpinner('none');
    toggleSearch('flex');
    toggleResult('block');
    }
}