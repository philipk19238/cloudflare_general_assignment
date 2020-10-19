class Base {
  constructor() {
    this.base_url = "https://general_assignment.pkung67.workers.dev";
    this.link_url = this.base_url + '/links';
    this.link_array = [
      { "name": "LinkedIn", "url": "https://linkedin.com/in/philipkung" },
      { "name": "Github", "url": "https://github.com/philipk19238" },
      { "name": "Resume", "url": "https://drive.google.com/file/d/11G6rjC42A-1JVE9PGU60_Q4jf8m1ZSHe/view?usp=sharing" }
    ];
    this.html_url = "https://static-links-page.signalnerve.workers.dev";
    this.profile_url = "https://avatars2.githubusercontent.com/u/47836685?s=460&u=a08c12cdebd49bf3a599841a61d3445846e20f0d&v=4";
    this.social_array = [
      {
        "name":"Instagram", 
        "url":"https://instagram.com/self.philip",
        "svg":"https://simpleicons.org/icons/instagram.svg"
      },
      {
        "name":"Facebook", 
        "url":"https://www.facebook.com/philip.kung.33/",
        "svg":"https://simpleicons.org/icons/facebook.svg"
      }
    ]; 
  }
}

class LinksTransformer {
  constructor() {
    this.base = new Base();
  }
  element(element) {
    const id = element.getAttribute("id");
    if (id) {
      if (id === 'profile') {
        element.removeAttribute("style");
      } 
      if (id === 'links') {
        let link_array = this.base.link_array;
        link_array.forEach(link => {
          let html_elem = `<a href="${link["url"]}">${link["name"]}</a>`;
          element.append(html_elem, { html: true });
        });
      } 
      if (id === 'avatar') {
        element.setAttribute("src", this.base.profile_url);
      } 
      if (id === 'name') {
        element.setInnerContent("Philip Kung");
      } 
      if (id === "social"){
        element.removeAttribute("style");
        let social_array = this.base.social_array; 
        social_array.forEach(social_link=>{
          let url = social_link["url"];
          let svg = social_link["svg"];
          let html_elem = `<a href="${url}"><img src="${svg}"></a>`;
          element.append(html_elem, {html:true});
        })
      }
    }
  }
}

const rewriter = new HTMLRewriter()
  .on('div', new LinksTransformer())
  .on('img', new LinksTransformer())
  .on('h1', new LinksTransformer());


async function handleRequest(request) {
  let base = new Base();
  if (request.url === base.link_url) {
    const response = returnLinks();
    return response;
  } else {
    const URL = base.html_url;
    const res = await fetch(URL);
    return rewriter.transform(res);
  }
}


async function returnLinks() {
  base = new Base();
  let responseJson = {
    "urls": base.link_array
  };
  let header = {
    headers: {
      'content-type': 'application/json'
    }
  };
  return new Response(JSON.stringify(responseJson), header);
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
});
