import { endpoints } from "./home.js";
import { deleteDataById,getAllData } from "./contains.js";

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
row.addEventListener('click', async function (e) {
    if (e.target.classList.contains('delete-btn')) {
        const blogId = e.target.getAttribute('data-id'); 
        const blogCard = e.target.closest('.col-4');

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteDataById(endpoints.blogs, blogId);

                    blogCard.remove();
                    Swal.fire(
                        'Deleted!',
                        `Blog with ID ${blogId} has been deleted.`,
                        'success'
                    );
                } catch (error) {
                    Swal.fire(
                        'Error!',
                        'An error occurred while deleting the blog.',
                        'error'
                    );
                    console.error(error);
                }
            }
        });
    }
});

document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("edit-btn")) {
        const blogId = e.target.getAttribute("data-id"); 
        const blog = blogs.find((b) => b.id === blogId); 
        
        if (!blog) return; 
        Swal.fire({
                title: 'Edit Blog',
                html: `
                  <div class="edit-blog">
                      <div class="field">
                          <label for="title">Title:</label>
                          <input type="text" id="title" value="${blog.title}" class="swal2-input">
                      </div>
                      <div class="field">
                          <label for="body">Body:</label>
                          <textarea id="body" class="swal2-textarea">${blog.body}</textarea>
                      </div>
                      <div class="field">
                          <label for="author">Author:</label>
                          <select id="author" class="swal2-input">
                              <option value="Dostoevskyi" ${blog.author === "Dostoevskyi" ? "selected" : ""}>Dostoevskyi</option>
                              <option value="Elcan" ${blog.author === "Elcan" ? "selected" : ""}>Elcan</option>
                              <option value="Nihad" ${blog.author === "Nihad" ? "selected" : ""}>Nihad</option>
                              <option value="Adolf" ${blog.author === "Adolf" ? "selected" : ""}>Adolf</option>
                          </select>
                      </div>
                  </div>
                `,
                showCancelButton: true,
                confirmButtonText: 'Save',
                cancelButtonText: 'Cancel',
                focusConfirm: false,
                preConfirm: () => {
                    const title = document.getElementById("title").value;
                    const body = document.getElementById("body").value;
                    const author = document.getElementById("author").value;
            
                    if (!title || !body || !author) {
                        Swal.showValidationMessage('All fields are required!');
                        return null;
                    }
            
                    return { title, body, author };
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const updatedData = result.value;
            
                    try {
                        const response = await fetch(`${BASE_URL}/${endpoints.blogs}/${blog.id}`, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(updatedData),
                        });
            
                        if (response.ok) {
                            const index = blogs.findIndex((b) => b.id === blog.id);
                            blogs[index] = { id: blog.id, ...updatedData };
                            drawCards(blogs);
            
                            Swal.fire('Saved!', 'Blog updated successfully.', 'success');
                        } else {
                            Swal.fire('Error!', 'Failed to update the blog.', 'error');
                        }
                    } catch (error) {
                        console.error(error);
                        Swal.fire('Error!', 'An error occurred while updating the blog.', 'error');
                    }
                }
            })
        }
})  