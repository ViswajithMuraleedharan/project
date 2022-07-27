const themeStyle=document.getElementById('theme-style');
const colourMode=document.getElementById('colour-mode');
const searchInput=document.getElementById('search');
const search=document.getElementById('search-user');
const errorMessage=document.getElementById('error-message');
const userImage=document.querySelector('.profile-img img');
const userTitle=document.querySelector('.profile h1');
const userName=document.querySelector('.profile a');
const userJoindate=document.querySelector('.profile small');

const userRepos=document.querySelector('#reposi');
const userFollowing=document.querySelector('#following');
const userFollowers=document.querySelector('#followers');
const userLocation=document.querySelector('#location');
const userEmail=document.querySelector('#email');
const userCompany=document.querySelector('#company');
const userTwitter=document.querySelector('#twitter');
const userBio=document.querySelector('#bio');

const defaultUser='Octocat';

function switchTheme(){
    if(themeStyle.getAttribute('href')=="#"){
        themeStyle.href="./style/dark.css";
    }
    else{
        themeStyle.href='#';
    }
}



//get github user

function getGithubUserDetails(username){
    fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) =>{
            
            //username not found
            if((data['message'] === 'Not Found')){
                errorMessage.style.display='inline-block'
            }
            else{
                if(errorMessage.style.display='inline-block'){
                    errorMessage.style.display='none';
                }
                console.log(data);
                userImage.src=data['avatar_url'];
                userTitle.innerText=data['name']==null? username:data['name'];
                userName.innerText=`${username}`;
                userName.href=`http://github.com/${username}`

                const date=new Date(data['created_at']).toUTCString().slice(3,16)
                userJoindate.innerText=`Joined at ${date}`;
                userRepos.innerHTML=`${data.public_repos}`;
                userFollowing.innerHTML=`${data.following}`;
                userFollowers.innerHTML=`${data.followers}`;
                userLocation.innerHTML=`${data.location}`;
                userEmail.innerHTML=`${data.email}`;
                userCompany.innerHTML=`${data.company}`;
                userTwitter.innerHTML=`${data.twitter_username}`;
                userBio.innerHTML=`${data.bio}`;
            }
        

            //either username is found

        
    });
}

  function searchUser(e){
    e.preventDefault();
    console.log(searchInput.value);
    const user=searchInput.value;
    //for user get his github details
    getGithubUserDetails(user);

}
getGithubUserDetails(defaultUser);
colourMode.onclick=switchTheme;
search.onsubmit=searchUser;