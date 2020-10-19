class Base {
	constructor(){
		this.base_url = "https://general_assignment.pkung67.workers.dev";
		this.link_url = this.base_url + '/links';
		this.link_array = [
			  {"name":"LinkedIn", "url":"https://linkedin.com/in/philipkung"},
			  {"name":"Github", "url":"https://github.com/philipk19238"},
			  {"name":"Instagram", "url":"https://instagram.com/self.philip"}
    ],
    this.html_url = "https://static-links-page.signalnerve.workers.dev";
	}
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  let base = new Base();
  if(request.url === base.link_url){
    const response = returnLinks();
    return response; 
  }else{
    return new Response("hello bob", {headers:{'content-type':'text/plain'}});
  }
  
}

async function returnLinks(){
  base = new Base();
  let responseJson = {
    "urls":base.link_array
  };
  let header = {
    headers:{
      'content-type':'application/json'
    }
  };
  return new Response(JSON.stringify(responseJson), header);
}

async function retrieveHTML(){
  let base = new Base();
  fetch(base.html_url).then(response=>{
    console.log(response);
  })
  
}