import './style.css'

let form = document.querySelector('form');

form.addEventListener('submit',async (e) => {
  e.preventDefault();
  Generating();
  let formData = new FormData(form);
  const data = await fetch('http://localhost:3000/dream', {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
    {
      "prompt": formData.get('prompt')
    })
  });
  if(data.ok)
  {
    const result =  await data.json();
    console.log(result);
    document.querySelector('#result').innerHTML = `<img src="${result.image}" width = "512" height = "512" alt = "${formData.get('prompt')}"/>`;
  }
  else
  {
    const err = await data.text;
    alert(err);
  }
  Generate();
});

function Generating()
{
  let button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = `Generating...`;

}
function Generate()
{
  let button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = `Generate`;
}