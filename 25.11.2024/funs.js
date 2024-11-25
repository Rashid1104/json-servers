import { endpoints } from "./home.js";
import { getAllData } from "./contains.js";

const row = document.querySelector('.row');

let blogs = null;

async function getBlogs() {
    try {
        const response = await getAllData(endpoints.blogs);
        blogs = response.data;
        drawCards(blogs);
    } catch (error) {
        console.log(error);
    }
}

getBlogs();

function drawCards(array) {
    row.innerHTML = "";
    array.forEach((blog) => {
        const col4Div = document.createElement('div')
        col4Div.className = 'col-4'
        col4Div.innerHTML = `
        <h2 class="card-title">${blog.title}</h2>
        <p class="card-text">${blog.body}...<a href= "#">learn more</a></p>
        <p class="author">Written by: ${blog.author}</p>
        <div class="card-footer">
          <button class="delete-btn" data-id="${blog.id}">Delete</button>
          <button class="edit-btn" data-id="${blog.id}">Edit</button>
        </div>
    `;
        row.append(col4Div)
    });

}

