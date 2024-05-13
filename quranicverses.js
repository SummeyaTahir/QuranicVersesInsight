function fetchOldVerses(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    console.log('Before sending request to:', url);
    xhr.onreadystatechange = function() {
        console.log('Ready state:', xhr.readyState);
        if (xhr.readyState === 4) {
            console.log('Request completed');
            if (xhr.status === 200) {
                console.log("Received response:", xhr.responseText);
                try {
                    var parsedResponse = JSON.parse(xhr.responseText);
                    console.log('Parsed response:', parsedResponse);
                    console.log("helooo")
                    console.log(url)
                    if (url.includes("surahurdu")) {
                        displayVersesWithUrdu(parsedResponse.ayats);
                    } else if (url.includes("suraheng")) {
                        displayVersesWitheng(parsedResponse.ayats);
                    } else if (url.includes("surahNames")) {
                        Names();
                        displayNames(parsedResponse.AllahNames);
                    } else if (url.includes("tafseer")) {
                        displaytafseer(parsedResponse.ayats);
                    } else if (url.includes("Duas")) {
                        document.getElementById("maincontainer").style.display = "none";
                        document.getElementById("Container_Duas").style.display = "block";
                        displayDuas(parsedResponse.Duas);
                    } else if (url.includes("surah")) {
                        console.log("i am in ")
                        var surahNo = url.split('/').pop();
                        console.log(surahNo)
                        displayVerses(parsedResponse);}
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        }
    };
    xhr.send();
}
async function fetchSurahs() {
    try{
        const response = await axios.get('/surahs');
        const surahs = response.data;
        const surahsContainer = document.getElementById('surahs-container');
        surahs.forEach(surah => {
            surahsContainer.innerHTML += `<button onclick="fetchVerses(${surah.surahNo})">${surah.surahName}</button>`;
        });
    } catch (error) {
        console.error('Error fetching surahs:', error.message);
    }
}
async function fetchVerses(surahNo) {
    try {
        const surahResponse = await axios.get(`/surahs/${surahNo}`);
        const surah = surahResponse.data;
        const ayatResponse = await axios.get(`/surah/${surahNo}`);
        const ayats = ayatResponse.data;
        displayVerses(surah.surahName, ayats);
    } catch (error) {
        console.error('Error fetching verses:', error.message);
    }
}
function displayVerses(ayats) {
    console.log("iiiiiii")
    var verseContainer = document.getElementById('verse-container');
    verseContainer.style.display = "block";
    console.log(ayats)
    for (var i = 0; i < ayats.length; i++) {
        console.log("checking in progress")
        console.log(ayats[i]);
        var arabicParagraph = document.createElement('p');
        arabicParagraph.textContent = ayats[i].text;
        arabicParagraph.style.fontSize = '24px';
        arabicParagraph.style.textAlign = 'right';
        arabicParagraph.style.fontWeight = 'bolder';
        arabicParagraph.style.margin = '15px';
        var hr = document.createElement('hr');
        arabicParagraph.appendChild(hr);
        verseContainer.appendChild(arabicParagraph);
    }
}
fetchSurahs(); 
function Names(){
    document.getElementById("maincontainer").style.display = "none";
    document.getElementById("Container_namesOfAllah").style.display = "block";
    document.getElementsByClassName("above_mode")[0].style.display = "none";
    document.getElementsByClassName("above_mode")[1].style.display = "none";
    document.getElementsByClassName("above_mode")[2].style.display = "none";
    document.getElementById('Container_Duas').style.display="none";
}
function displayDuas(ayats){
    var verseContainer = document.getElementById('Container_Duas');
    verseContainer.style.display="block"
    verseContainer.innerHTML = '';
    for (var i = 0; i < ayats.length; i++) {
        var ayat = ayats[i];
        var part1=ayat.key.split('|');
        var namePart = part1[0].trim();
        var urlPart = part1[1].trim();
        var nameParagraph = document.createElement('p');
        nameParagraph.textContent = namePart;
        var hr = document.createElement('hr');
        var br = document.createElement('br');
        nameParagraph.style.fontSize = '24px';
        nameParagraph.style.fontWeight='bold';
        nameParagraph.style.textAlign = 'center';
        nameParagraph.style.margin='15px'
        nameParagraph.appendChild(br);
        verseContainer.appendChild(nameParagraph);
        var img_url = document.createElement('img');
        img_url.src=urlPart;
        img_url.style.marginLeft = '30%';
        img_url.style.height="300px"
        verseContainer.appendChild(img_url);
        var part2=ayat.value.split('|');
        var arabicPart = part2[0].trim();
        var engPart = part2[1].trim();
        var arabicParagraph = document.createElement('p');
        arabicParagraph.textContent = arabicPart;
        arabicParagraph.style.fontFamily = 'Arial, Helvetica, sans-serif;';
        arabicParagraph.style.fontSize = '24px';
        arabicParagraph.style.textAlign = 'center';
        arabicParagraph.style.fontWeight='bolder';
        arabicParagraph.style.margin='15px'
        verseContainer.appendChild(arabicParagraph);
        var hr = document.createElement('hr');
        var engParagraph = document.createElement('p');
        engParagraph.appendChild(hr);
        engParagraph.textContent = engPart;
        engParagraph.style.textAlign = 'center';
        engParagraph.style.fontSize = '19px';
        engParagraph.style.margin='15px'
        engParagraph.appendChild(br);
        engParagraph.appendChild(hr);
        verseContainer.appendChild(engParagraph);
    }
}
function displayVersesWithUrdu(ayats) {
    var verseContainer = document.getElementById('verse-containerurdu');
    verseContainer.style.display="block"
    verseContainer.innerHTML = '';
    ayats.sort((a, b) => parseInt(a.arabic) - parseInt(b.arabic));
    for (var i = 0; i < ayats.length; i++) {
        var ayat = ayats[i];
        var parts = ayat.urdu.split('|');
        var arabicPart = parts[0].trim();
        var urduPart = parts[1].trim();
        var arabicParagraph = document.createElement('p');
        arabicParagraph.textContent = arabicPart;
        arabicParagraph.style.fontSize = '24px';
        arabicParagraph.style.fontWeight='bold';
        arabicParagraph.style.textAlign = 'right';
        arabicParagraph.style.margin='15px'
        verseContainer.appendChild(arabicParagraph);
        var hr = document.createElement('hr');
        var urduParagraph = document.createElement('p');
        urduParagraph.textContent = urduPart;
        urduParagraph.style.fontSize = '16px';
        urduParagraph.style.textAlign = 'right';
        urduParagraph.style.margin='15px'
        urduParagraph.appendChild(hr);
        verseContainer.appendChild(urduParagraph);
    }
}
function displayVersesWitheng(ayats) {
    var verseContainer = document.getElementById('verse-containereng');
    verseContainer.style.display="block"
    verseContainer.innerHTML = '';
    ayats.sort((a, b) => parseInt(a.arabic) - parseInt(b.arabic));
    for (var i = 0; i < ayats.length; i++) {
        var ayat = ayats[i];
        var parts = ayat.eng.split('|');
        var arabicPart = parts[0].trim();
        var engPart = parts[1].trim();
        var arabicParagraph = document.createElement('p');
        arabicParagraph.textContent = arabicPart;
        arabicParagraph.style.fontFamily = 'Arial, Helvetica, sans-serif;';
        arabicParagraph.style.fontSize = '24px';
        arabicParagraph.style.textAlign = 'right';
        arabicParagraph.style.fontWeight='bolder';
        arabicParagraph.style.margin='15px'
        verseContainer.appendChild(arabicParagraph);
        var hr = document.createElement('hr');
        var engParagraph = document.createElement('p');
        engParagraph.appendChild(hr);
        engParagraph.textContent = engPart;
        engParagraph.style.textAlign = 'right';
        engParagraph.style.fontSize = '19px';
        engParagraph.style.margin='15px'
        verseContainer.appendChild(engParagraph);
    }
}
function displaytafseer(ayats) {
    var verseContainer = document.getElementById('verse-containertafseer');
    verseContainer.style.display="block"
    verseContainer.innerHTML = '';
    ayats.sort((a, b) => parseInt(a.arabic) - parseInt(b.arabic));
    for (var i = 0; i < ayats.length; i++) {
        var ayat = ayats[i];
        var parts = ayat.eng.split('|');
        var arabicPart = parts[0].trim();
        var engPart = parts[1].trim();
        var tafseerPart = parts[2].trim();
        var noParagraph = document.createElement('p');
        noParagraph.textContent = (parseInt(ayat.arabic) );
        var br = document.createElement('br');
        noParagraph.style.fontSize = '21px';
        noParagraph.style.textAlign = 'center';
        noParagraph.style.fontWeight='bold';
        noParagraph.style.border="1px solid rgb(3, 3, 80,)";
        verseContainer.appendChild(noParagraph);
        var hr = document.createElement('hr');
        var arabicParagraph = document.createElement('p');
        arabicParagraph.textContent = arabicPart;
        arabicParagraph.style.fontFamily = 'Arial, Helvetica, sans-serif;';
        arabicParagraph.style.fontSize = '29px';
        arabicParagraph.style.textAlign = 'right';
        arabicParagraph.style.fontWeight='bolder';
        arabicParagraph.style.margin='15px'
        arabicParagraph.appendChild(hr);
        verseContainer.appendChild(arabicParagraph);
        var hr = document.createElement('hr');
        var engParagraph = document.createElement('p');
        engParagraph.appendChild(hr);
        engParagraph.textContent = engPart;
        engParagraph.style.textAlign = 'right';
        engParagraph.style.fontSize = '19px';
        engParagraph.style.margin='15px'
        engParagraph.style.fontWeight='bold';
        engParagraph.appendChild(hr);
        verseContainer.appendChild(engParagraph);
        var tafseerParagraph = document.createElement('p');
        tafseerParagraph.textContent = tafseerPart;
        tafseerParagraph.style.fontFamily = 'Arial, Helvetica, sans-serif;';
        tafseerParagraph.style.fontSize = '19px';
        tafseerParagraph.style.textAlign = 'right';
        tafseerParagraph.style.margin='15px'
        tafseerParagraph.appendChild(hr);
        verseContainer.appendChild(tafseerParagraph);
    }
}
function displayNames(ayats) {
    var verseContainer = document.getElementById('Container_namesOfAllah');
    verseContainer.innerHTML = '';
    if (ayats && ayats.length) {
        for (var i = 0; i < ayats.length; i++) {
            var ayat = ayats[i];
            var noParagraph = document.createElement('p');
            noParagraph.textContent = (parseInt(ayat.arabic) + 1);
            var br = document.createElement('br');
            noParagraph.style.fontSize = '21px';
            noParagraph.style.textAlign = 'center';
            noParagraph.style.fontWeight='bold';
            noParagraph.style.border="1px solid rgb(3, 3, 80,)";
            verseContainer.appendChild(noParagraph);
            var parts = ayat.eng.split('|');
            var arabicPart = parts[0].trim();
            var engPart = parts[1].trim();
            var arabicDiv = document.createElement('div');
            var arabicSpan = document.createElement('span');
            arabicSpan.textContent = arabicPart;
            arabicSpan.style.fontSize = '29px';
            arabicDiv.style.textAlign = 'center';
            arabicSpan.style.fontWeight='bolder';
            arabicDiv.style.lineHeight='90px'
            arabicSpan.style.margin='15px'
            arabicDiv.style.height="90px"
            arabicDiv.appendChild(arabicSpan);
            arabicDiv.style.border="1px solid rgb(3, 3, 80,)";
            arabicDiv.style.boxShadow='0 0 20px 6px rgba(3, 3, 80, 0.6)';
            verseContainer.appendChild(arabicDiv);
            var engParagraph = document.createElement('p');
            engParagraph.textContent = engPart;
            engParagraph.style.fontWeight='bold';
            engParagraph.style.fontSize = '17px';
            engParagraph.style.textAlign = 'center';
            engParagraph.style.margin='15px'
            engParagraph.appendChild(br)
            verseContainer.appendChild(engParagraph);
        }
    } else {
        console.error('Invalid or undefined ayats object.');
    }
}
function displayVerses(ayats) {
    var verseContainer = document.getElementById('verse-container');
    verseContainer.style.display="block"
    verseContainer.innerHTML = '';
    for (var i = 0; i < ayats.length; i++) {
        var arabicParagraph = document.createElement('p');
        arabicParagraph.textContent = ayats[i];
        arabicParagraph.style.fontSize = '24px';
        arabicParagraph.style.textAlign = 'right';
        arabicParagraph.style.fontWeight='bolder';
        arabicParagraph.style.margin='15px'
        var hr = document.createElement('hr');
        arabicParagraph.appendChild(hr);
        verseContainer.appendChild(arabicParagraph);
    }
}
function home_logo(){
    document.getElementById("maincontainer").style.display="block";
    document.getElementsByClassName("above_mode")[0].style.display = "none";
    document.getElementsByClassName("above_mode")[1].style.display = "none";
    document.getElementsByClassName("above_mode")[2].style.display = "none";
    document.getElementsByClassName("above_mode")[3].style.display = "none";
    document.getElementsByClassName("container-fluid")[0].style.display = "none";
    document.getElementById('Container_namesOfAllah').style.display="none";
    document.getElementById('Container_Duas').style.display="none";
    document.getElementById('containertafseer').style.display="none";
    document.getElementById('containereng').style.display="none";
    document.getElementById('containerurdu').style.display="none";
}
function Quran_logo(){
    document.getElementById("maincontainer").style.display="none";
    document.getElementsByClassName("above_mode")[0].style.display = "block";
    document.getElementsByClassName("above_mode")[1].style.display = "block";
    document.getElementsByClassName("above_mode")[2].style.display = "block";
    document.getElementsByClassName("above_mode")[3].style.display = "block";
    document.getElementById('Container_Duas').style.display="none";
    document.getElementById('Container_namesOfAllah').style.display="none";
}
function Names_logo(){
    document.getElementById("maincontainer").style.display="none";
    document.getElementsByClassName("above_mode")[0].style.display = "none";
    document.getElementsByClassName("above_mode")[1].style.display = "none";
    document.getElementsByClassName("above_mode")[2].style.display = "none";
    document.getElementById('Container_namesOfAllah').style.display="block";
    document.getElementById('Container_Duas').style.display="none";
}
function Quran(){
    document.getElementById("maincontainer").style.display="none";
    document.getElementsByClassName("above_mode")[0].style.display = "block";
    document.getElementsByClassName("above_mode")[1].style.display = "block";
    document.getElementsByClassName("above_mode")[2].style.display = "block";
    document.getElementsByClassName("above_mode")[3].style.display = "block";
}
function Duas(){
    document.getElementById("maincontainer").style.display="none";
    document.getElementsByClassName("above_mode")[0].style.display = "none";
    document.getElementsByClassName("above_mode")[1].style.display = "none";
    document.getElementsByClassName("above_mode")[2].style.display = "none";
}
function eng(){ 
    // document.getElementById("container1").style.display = "none";
    document.getElementById("containereng").style.display = "block";
    document.getElementsByClassName("container-fluid")[0].style.display = "none";
    document.getElementById("containerurdu").style.display = "none";
    document.getElementById("containertafseer").style.display = "none";
}
function urdu(){ 
    // document.getElementById("container1").style.display = "none";
    document.getElementById("containerurdu").style.display = "block";
    document.getElementsByClassName("container-fluid")[0].style.display = "none";
    document.getElementById("containereng").style.display = "none";
    document.getElementById("containertafseer").style.display = "none";
}
function reading(){
    // document.getElementById("container1").style.display = "none";
    var verseContainer = document.getElementById('verse-container');
    document.getElementsByClassName("container-fluid")[0].style.display = "block";
    document.getElementById("containertafseer").style.display = "none";
    document.getElementById("containerurdu").style.display = "none";
    document.getElementById("containereng").style.display = "none";
}
function tafseer(){ 
    document.getElementById("containertafseer").style.display = "block";
    document.getElementsByClassName("container-fluid")[0].style.display = "none";
    document.getElementById("containerurdu").style.display = "none";
    document.getElementById("containereng").style.display = "none";
}