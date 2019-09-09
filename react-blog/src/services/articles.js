import Axios from 'axios';
import config from '../config';
import { validateAll } from 'indicative';


export default class ArticlesService {

  async getArticles(url = `${config.apiUrl}/articles`) {

    const response = await Axios.get(url);
    //console.log(response.data);

    return response.data.data;

  }

  async getUserArticles(token, url = `${config.apiUrl}/user/articles`) {

    const response = await Axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
      return response.data.data;
  }

  async deleteArticle(id, token) {
    await Axios.delete(`${config.apiUrl}/articles/${id}`, {
      headers:{
        Authorization: `Bearer ${token}`
      }
    });

    return true;
  }

  async getArticle(slug) {
      const response = await Axios.get(`${config.apiUrl}/article/${slug}`);

      return response.data.data;
  }


  async getArticlesCategories() {

    const categories = JSON.parse(localStorage.getItem('categories'));

    if(categories) { //check if categories exist in local storage
      return categories;
    }

    const response = await Axios.get(`${config.apiUrl}/categories`);
    localStorage.setItem('categories', JSON.stringify(response.data.categories)); //store categories in local storage
    return response.data.categories;
  }

  createArticle = async(data, token) => {
    //console.log(data);

    if(!data.image) {
      return Promise.reject([{
        message: 'The image is required',
      }]);
    }

    try {

      const rules = {
        title: 'required',
        content: 'required',
        category: 'required',
      };


      const messages = {
        required: 'The {{ field }} is required',
      };


      await validateAll(data, rules, messages);


      const image = await this.uploadToCloudinary(data.image);
      console.log(image)


      const response = await Axios.post(`${config.apiUrl}/articles`, {
        title: data.title,
        content: data.content,
        category_id: data.category,
        imageUrl: image.secure_url,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;

    } catch(errors) {
      if(errors.response) {
        return Promise.reject(errors.response.data);
      }
      return Promise.reject(errors);
    }

}


updateArticle = async(data, article, token) => {
  //console.log(data);

  let image;

  if(data.image) {
    image = await this.uploadToCloudinary(data.image);
  }

  try {

    const rules = {
      title: 'required',
      content: 'required',
      category: 'required',
    };


    const messages = {
      required: 'The {{ field }} is required',
    };


    await validateAll(data, rules, messages);

    const response = await Axios.put(`${config.apiUrl}/articles/${article.id}`, {
      title: data.title,
      content: data.content,
      category_id: data.category,
      imageUrl: image ? image.secure_url : article.imageUrl,
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return response.data;

  } catch(errors) {
    if(errors.response) {
      return Promise.reject(errors.response.data);
    }
    return Promise.reject(errors);
  }

}

    //console.log(response);



  async uploadToCloudinary(image) {
    const form = new FormData();
    form.append('file', image);
    form.append('upload_preset', 'cxznel4b');

    const response = await Axios.post('https://api.cloudinary.com/v1_1/manik782/image/upload', form);

    console.log(response);

    return response.data;

  }
}
