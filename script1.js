var totalPriceOfCombo = 0;
var priceseat = 0;
var selectedData = [];
var modalshowtime = document.getElementById("showtime");
var btnsht = document.getElementById("openShowtime");
var span = document.getElementsByClassName("clo")[0];
var username = localStorage.getItem("username");
var password = localStorage.getItem("password");
var checkcount = document.getElementById("btncheckcount");

if (btnsht != null) {
    btnsht.addEventListener("click", function () {
        if (username == "mai" && password == "123") {
            modalshowtime.style.display = "block";
        } else {
            window.location.href = "dangnhap.html";
        }
    });
}
if (span != null) {
    span.addEventListener("click", function () {
        modalshowtime.style.display = "none";
    });

}
function Login() {
    var username = document.getElementById("ten").value;
    var password = document.getElementById("matkhau").value;
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
    window.location.href = "moviedetail.html";
};
function createGrid() {
    const rows = 10;
    const columns = 16;
    const gridcontainek = document.getElementById('gridcontainek');
    gridcontainek.innerHTML = "";
    gridcontainek.style.display = 'grid';
    gridcontainek.style.gridTemplateColumns = `repeat(${columns}, 40px)`;
    gridcontainek.style.gridTemplateRows = `repeat(${rows}, 40px)`;
    const selectedList = document.getElementById('selectedList');
    const price = document.getElementById('price');

    const totalSquares = columns * rows;

    for (let i = 0; i < totalSquares; i++) {
        const gridItem = document.createElement('button');
        gridItem.textContent = "A" + i;
        gridItem.style.width = "35px";
        gridItem.style.height = "35px";
        gridItem.style.textAlign = 'center';
        gridItem.style.fontSize = '10px';
        gridItem.style.border = '2px solid rgb(154, 205, 153)';
        gridItem.style.backgroundColor = 'white';
        gridItem.addEventListener('click', function () {
            if (selectedData.length >= 8 && gridItem.style.backgroundColor === 'white') {
                alert('Maximum selection limit reached.');
                return;
            }
            if (gridItem.style.backgroundColor === 'white') {
                gridItem.style.backgroundColor = 'rgb(169, 0, 0)';
                gridItem.style.color = "white";
                gridItem.style.border = '2px solid rgb(169, 0, 0)';
                selectedData.push(gridItem.textContent);
            } else {
                gridItem.style.backgroundColor = 'white';
                gridItem.style.border = '2px solid rgb(154, 205, 153)';
                gridItem.style.color = "black";
                const index = selectedData.indexOf(gridItem.textContent);
                if (index !== -1) {
                    selectedData.splice(index, 1);
                }

            }
            updateList();
        });
        gridcontainek.appendChild(gridItem);
    }
    function updateList() {
        selectedList.innerHTML = '';
        price.textContent = 50000 * selectedData.length;
        priceseat = 50000 * selectedData.length;
        totalPriceFull();
        selectedData.forEach(function (data) {
            const listItem = document.createElement('span');
            const phay = document.createElement('span');
            phay.textContent = ',';
            phay.style.color = "black";
            listItem.textContent = data;
            listItem.style.color = "black";
            selectedList.appendChild(listItem);
            selectedList.appendChild(phay);
        });
    }
}






function combodrink() {
    var containekmain = document.querySelector("#containekmain");
    var containekmain2 = document.querySelector("#containekmain2");
    var btncheckcount = document.getElementById("btncheckcount");
    btncheckcount.style.display = "block";
    containekmain.style.display = "none";
    containekmain2.style.display = "block";
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function seat() {
    var containekmain = document.querySelector("#containekmain");
    var containekmain2 = document.querySelector("#containekmain2");
    var btncheckcount = document.getElementById("btncheckcount");
    btncheckcount.style.display = "none";
    containekmain.style.display = "flex";
    containekmain2.style.display = "none";
    window.scrollTo({
        top: 100,
        behavior: 'smooth'
    });
}

function increment(index) {

    var selectcombo = document.getElementById("selectcombo");
    var combo = document.createElement("div");
    var price = document.getElementById("P" + index);
    var namecombo = document.getElementById("N" + index);
    var inputField = document.getElementById('I' + index);
    var currentValue = parseInt(inputField.value);
    var existingCombo = document.getElementById('C' + index);
    if (existingCombo) {
        selectcombo.removeChild(existingCombo);
    }
    if (currentValue < 4) {
        inputField.value = currentValue + 1;
        var pri = price.value * 1;
        totalPriceOfCombo += pri;
        pricombo();
    } else {
        alert("Maximum is 4")
    }


    combo.innerHTML = 'x' + inputField.value + namecombo.innerHTML;
    combo.id = 'C' + index;
    combo.classList.add("combos");
    combo.style.color = "black";
    selectcombo.appendChild(combo);
}

function decrement(index) {

    var selectcombo = document.getElementById("selectcombo");
    var namecombo = document.getElementById("N" + index);
    var inputField = document.getElementById('I' + index);
    var currentValue = parseInt(inputField.value);
    var existingCombo = document.getElementById('C' + index);
    if (existingCombo) {
        selectcombo.removeChild(existingCombo);
    }

    if (currentValue > 0) {
        inputField.value = currentValue - 1;
        if (inputField.value > 0) {
            var combo = document.createElement("div");
            combo.innerHTML = 'x' + inputField.value + namecombo.innerHTML;
            combo.id = 'C' + index;
            combo.classList.add("combos");

            combo.style.color = "black";
            selectcombo.appendChild(combo);
        }
    }

    if (currentValue > 0) {
        var price = document.getElementById("P" + index);
        var pri = price.value * 1;
        totalPriceOfCombo -= pri;
        pricombo();
    }
}

function pricombo() {
    var pricecombo = document.getElementById("pricecombo");
    pricecombo.textContent = totalPriceOfCombo;
    totalPriceFull();
}

function totalPriceFull() {
    var total = document.getElementById("totalpricefull");
    total.textContent = priceseat + totalPriceOfCombo;
}
function Thanhtoan() {
    const thanhtoan = {
        listseat: selectedData,
        listcombo: selectcombo.innerHTML,
        priceseat: 50000 * selectedData.length,
        pricecombo: totalPriceOfCombo,
        pricebill: priceseat + totalPriceOfCombo
    };
    const dataCheckcount = JSON.stringify(thanhtoan);
    localStorage.setItem('datacheckcount', dataCheckcount);
    console.log(dataCheckcount);

    window.location.href = "thanhtoan.html";
}

function ShowBill() {
    debugger
    var llll = document.getElementById("llll");
    var pricecheckcount = document.getElementById("pricecheckcount");
    var pricecombocheckcount = document.getElementById("pricecombocheckcount");
    var selectcombocheckcount = document.getElementById("selectcombocheckcount");
    var totalpricefullcheckcount = document.getElementById("totalpricefullcheckcount");
    const data = localStorage.getItem('datacheckcount');
    const da = JSON.parse(data);
    const listseatString = da.listseat.join(', ');

    llll.innerHTML = listseatString;
    pricecheckcount.innerHTML = da.priceseat;
    pricecombocheckcount.innerHTML = da.pricecombo;
    selectcombocheckcount.innerHTML= da.listcombo;
    totalpricefullcheckcount.innerHTML = da.pricebill;


}





let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length - 1;
let active = 0;
next.onclick = function(){
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}
let refreshInterval = setInterval(()=> {next.click()}, 3000);
function reloadSlider(){
    slider.style.left = -items[active].offsetLeft + 'px';
    // 
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(()=> {next.click()}, 3000);

    
}

dots.forEach((li, key) => {
    li.addEventListener('click', ()=>{
         active = key;
         reloadSlider();
    })
})
window.onresize = function(event) {
    reloadSlider();
};
