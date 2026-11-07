//your JS code here. If required.
const output = document.getElementById("output");
const loader = document.getElementById("loading");
const error = document.getElementById("error");
const btn = document.getElementById("download-images-button");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url){
	return new Promise((resolve,reject)=>{
		const img=new Image();

		img.onload=()=>{
			resolve(img);
		};

		img.onerror=()=>{
			reject("Image download failed")
		};
		img.src=url;
	})
	
}


async function downloadImages(){
	loader.style.display="block";
	error.innerText="";
	output.innerHTML=""
	try{
		const promises=images.map(image=>{
			return downloadImage(image.url);
		})

		const downloadedImages=await Promise.all(promises);

		downloadedImages.forEach(img=>{
			output.appendChild(img);
		})
	}
	catch(err){
		error.innerText=err.message;
	}
	finally{
		loader.style.display="none";
	}
}

btn.addEventListener("click",downloadImages)
