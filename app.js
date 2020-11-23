const projectlist=document.querySelector('#prolist');
const form=document.querySelector('#enterIdea');

function renderplist(doc){
    let li=document.createElement('li');
    let pro= document.createElement('span');
    let desc=document.createElement('pre');
    let cross=document.createElement('div');
    let edit=document.createElement('div1');

    

    li.setAttribute('data-id',doc.id);
    pro.textContent = doc.data().pro;
    desc.textContent=doc.data().desc;
    cross.textContent = 'x';
    edit.textContent = "edit";

    li.appendChild(pro);
    li.appendChild(desc);
    li.appendChild(edit);
    li.appendChild(cross);


    projectlist.appendChild(li);

    cross.addEventListener('click', (e) =>{
        e.stopPropagation();
        let id= e.target.parentElement.getAttribute('data-id');
        db.collection('PLIST').doc(id).delete();
    })

    edit.addEventListener('click', (e) =>{
        e.stopPropagation();
        let id= e.target.parentElement.getAttribute('data-id');
        var name=prompt("Enter the name of your idea!","");
        if(name==="")
        {
            alert("ENTER IDEA NAME FOR GOD SAKE!");
            return;
        }
        else{
            var descr=prompt("Enter the description!","");
            db.collection('PLIST').doc(id).update(
                {
                    pro: name,
                    desc: descr
                }
            );
            alert("Refresh to see changes");
        }
    })
}

/* db.collection('PLIST').get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderplist(doc);
    })
}) */

form.addEventListener('submit', (e) => {
    e.preventDefault();
    var empt= document.form1.eidea.value;
    if(empt==="")
    {
        alert("Boo!!! Please enter something atleast!!!");
        return false;

    }
    else{
    db.collection('PLIST').add({
        pro: form.eidea.value,
        desc: form.idead.value
    });
    form.eidea.value='';
    form.idead.value='';
    return true;
}
});

db.collection('PLIST').onSnapshot(snapshot =>{
    let changes=snapshot.docChanges();
    changes.forEach(change=>{
        console.log(change.doc.data());
        if(change.type == 'added'){
            renderplist(change.doc);
        } else if (change.type == 'removed'){
            let li = projectlist.querySelector('[data-id=' + change.doc.id + ']');
            projectlist.removeChild(li);
        }
    });
});
