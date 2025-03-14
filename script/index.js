

function loadCategories(){
    //fetch the data

    fetch(" https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res)=>res.json())
    .then((data)=>displayCategories(data.categories));
}

function loadVideos(){
    fetch(" https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((response) => response.json())
    .then((data) => displayVideos(data.videos));
}

const loadCategoryVideos=(id) =>{
    
    const url= `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
    console.log(url);

    fetch(url)
    .then(res=>res.json())
    .then(data=>{
        const clickedButton =document.getElementById(`btn-${id}`);
        console.log(clickedButton)
        displayVideos(data.category)
    });
}


// {
//     "category_id": "1001",
//     "category": "Music"
// }

function displayCategories(categories){
    const categoryContainer = document.getElementById('category-container');
    for(let cat of categories){
        // console.log(cat);
        const categoryDiv=document.createElement("div");
        categoryDiv.innerHTML=`
        <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `;
        categoryContainer.append(categoryDiv);

    }
}

// {
//     "category_id": "1003",
//     "video_id": "aaaj",
//     "thumbnail": "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
//     "title": "Kid Gorgeous",
//     "authors": [
//         {
//             "profile_picture": "https://i.ibb.co/xsfkwN2/john.jpg",
//             "profile_name": "John Mulaney",
//             "verified": true
//         }
//     ],
//     "others": {
//         "views": "241K",
//         "posted_date": ""
//     },
//     "description": "John Mulaney's 'Kid Gorgeous' has captured the hearts of many with 241K views. As a verified comedian, John delivers a masterclass in stand-up with clever anecdotes, quick wit, and relatable humor. This performance is a laugh-filled adventure through his unique take on life, politics, and pop culture."
// }

const displayVideos =(videos)=> {
    const videoContainer = document.getElementById("video-container");

    videoContainer.innerHTML="";

if(video.length==0){
    videoContainer.innerHTML=`
     <div class="py-20 col-span-full flex flex-col justify-center items-center text-center">
            <img class="w-[120px]" src="./Assets/Icon.png" alt="">
            <h2 class="text-2xl font-bold">Oops!!Sorry, There is no content here</h2>
        </div>
        `;
    return;
}

videos.forEach(video=>{
    console.log(video);

    const videoCard = document.createElement("div");

    videoCard.innerHTML=`
  <div class="card bg-base-100  ">
            <figure class="relative">
              <img class="w-full h-[150px] object-cover"

                src="${video.thumbnail}s"
                alt="Shoes" />
                <span class="absolute bottom-2 right-2 text-white bg-black px-2 text-sm rounded">3hrs 56 min ago</span>
            </figure> 
            
            <div class=" flex gap-3 px-0 py-5" >
                <div class="profile">
                    <div class="avatar">
                        <div class="ring-primary ring-offset-base-100 w-6 rounded-full ring ring-offset-2">
                          <img src="${video.authors[0].profile_picture}" />
                        </div>
                      </div>
                </div>
                <div class="intro">
                    <h2 class="text-sm font-semibold">Midnight Serenade</h2>
                    <p class="text-sm text-gray-400 flex gap-1 ">${video.authors[0].profile_name} <img class="w-5 h-5"  src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt=""></p>
                    <p class="text-sm text-gray-400">${video.others.views} views</p>
                </div>
            </div>
          </div>
    
    `;
    videoContainer.append(videoCard);
});

};
loadCategories();
