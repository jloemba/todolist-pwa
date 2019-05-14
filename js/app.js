

//import AppCard from '/js/components/card/card.js';
import Task from '/js/components/task/task.js';
import Form from '/js/components/form/form.js';

//
import { openDB } from 'idb';

//
import checkConnectivity from '/js/connection.js';

(async function(document) {
  const app = document.querySelector('#app');
  const skeleton = app.querySelector('.skeleton');
  const listPage = app.querySelector('[page=list]');

  checkConnectivity(3, 1000);
  
  document.addEventListener('connection-changed', ({ detail }) => {
    console.log(detail.online);
  });
  skeleton.removeAttribute('active');
  listPage.setAttribute('active', '');

  try {
    const data = await fetch('/data/spacex.json');
    const json = await data.json();

    const database = await openDB('app-store', 1, {
      upgrade(db) {
        db.createObjectStore('articles');
      }
    });

    //Vérifier si on est en ligne pour mettre à jour la todo list
    if (navigator.onLine) {
      await database.put('articles', json, 'articles');
    }


    // Récupérer les données mis en caches
    const articles = await database.get('articles', 'articles');
    
    // Instancier le web components
    const tasks = json.map(item => {
      const taskElement = new Task();
  
      taskElement.initTask( //Passer par l'attribut 'content' pour avoir les données
        item.content.id,
        item.content.task,
      );
      
      //Ajouter la tache crée à la liste
      listPage.appendChild(taskElement);
  
      return taskElement;
    });

    document.addEventListener('add-favorit', async e => {
      const updatedArticle = articles.map(article => {
        article.content.title === e.detail.article ? article.favoris = true : article.favoris = false;
        return article;
      });

      await database.put('articles', updatedArticle, 'articles');
    });

    const callback = function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          //card.swapImage();
        }
      });
    };
  
    const io = new IntersectionObserver(callback);
    
    // On indique 
    tasks.forEach(task => {
      io.observe(task);
    });
  } catch (error) {
    console.error(error, ':(');
  }
})(document);
