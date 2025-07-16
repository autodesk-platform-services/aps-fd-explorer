import { initViewer, loadModel } from './viewer.js'

window.addEventListener("load", async () => {
  const login = document.getElementById('login');
  const urnInput = document.getElementById('modelurn');
  const viewerToggle = document.getElementById('toggleviewer');
  const viewerDiv = document.getElementById('viewer');
  const graphiqlDiv = document.getElementById('graphiql');
  new ResizeObserver(() => {
    viewerDiv.style.height = `calc( ${document.body.scrollHeight}px - (1em + ${graphiqlDiv.clientHeight}px))`;
    if (!!globalViewer)
      globalViewer.resize();
  }).observe(graphiqlDiv);
  initViewer(viewerDiv).then(viewer => {
    globalViewer = viewer;
  });
  try {
    const resp = await fetch('/api/auth/profile');
    if (resp.ok) {
      const user = await resp.json();
      login.innerText = `Logout (${user.name})`;
      login.onclick = () => window.location.replace('/api/auth/logout');
    } else {
      login.innerText = 'Login';
      login.onclick = () => window.location.replace('/api/auth/login');
    }
    login.style.visibility = 'visible';
  } catch (err) {
    alert('Could not initialize the application. See console for more details.');
    console.error(err);
  }
})

function findValue(obj, targetKey) {
  for (let key in obj) {
    if (key === targetKey) {
      return obj[key];
    }

    if (typeof obj[key] === 'object') {
      const result = findValue(obj[key], targetKey);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return undefined;
}

async function showToast(message) {
  Swal.fire({
    title: message,
    timer: 5000,
    toast: true,
    position: 'top',
    showConfirmButton: false
  })
}

async function resizeGraphiql(graphiqlDiv, increase) {
  if (increase) {
    graphiqlDiv.style.height = 'calc(100% - 3em)';
  }
  else {
    graphiqlDiv.style.height = 'calc(70%)';
  }
}

async function loadNDisplayModel(graphiqlDiv, viewerDiv, viewer, urn) {
  try {
    viewerDiv.style.visibility = 'visible';
    viewerDiv.style.height = `calc( ${document.body.scrollHeight}px - (1em + ${graphiqlDiv.clientHeight}px))`;
    viewer.resize();
    loadModel(viewer, btoa(urn)).then();
  }
  catch (err) {
    console.log(`Not able to load the model: ${err}`);
  }
}

async function hideModel(viewerDiv) {
  try {
    viewerDiv.style.visibility = 'hidden';
  }
  catch (err) {
    console.log(`Not able to load the model: ${err}`);
  }
}