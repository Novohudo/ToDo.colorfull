import axios from 'axios'
//params-в поле запроса на сервер определяет квери параметр с нужными параметрами-создаваемые здесь же в теле функции


export default class PostService {
	static async getAll(limit = 10, page = 1) {
		try {

		} catch (e) {
			console.log(e)
		}
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
			params: {
				_limit: limit,
				_page: page
			}
		})
		return response;
	}

	static async getById(id) {
		const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
		return response;
	}
}