<template>
  <div>
    <form>

      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="userData.email" required />
      </div>

      <div>
        <label for="name">Name:</label>
        <input id="name" v-model="userData.name" required />
      </div>

      <div>
        <label for="phone">Phone:</label>
        <input id="phone" v-model="userData.phone" required />
      </div>

      <div>
        <label for="position">Position:</label>
        <select id="position" v-model="userData.position_id" required>
          <option value="1">Lawyer</option>
          <option value="2">Content Manager</option>
          <option value="3">Security</option>
          <option value="4">Designer</option>
        </select>
      </div>

      <div>
        <label for="photo">Photo:</label>
        <input type="file" id="photo" @change="handleFileChange" />
      </div>

      <button @click="handleSubmit" style="margin-bottom: 10px;">Submit</button>
      <button @click="getNewAccessToken">Get new access token</button>

      <p v-if="successMessage" style="color: green;">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const userData = ref({});
const successMessage = ref('');

function handleFileChange(event) {
  const file = event.target.files[0];
  userData.value.avatar = file;
}

async function handleSubmit() {
  const formData = new FormData();
  const data = userData.value;

  formData.append('email', data.email);
  formData.append('name', data.name);
  formData.append('phone', data.phone);
  formData.append('position_id', data.position_id);
  formData.append('avatar', data.avatar);

  try {
    const response = await axios.post('http://localhost:8080/api/users', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'token': localStorage.getItem('accessToken')
      }
    })
    if (response.data.success) {
      successMessage.value = response.data.message;
    }
  }
  catch (error) {
    console.error(error);
  }
}

async function getNewAccessToken() {
  try {
    const response = await axios.get('http://localhost:8080/api/token')
    localStorage.setItem('accessToken', response.data.token);
  }
  catch (error) {
    console.error(error);
  }
}

</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}

.success-button {
  border: 2px solid green;
}

div {
  margin-bottom: 10px;
}

label {
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: #28666e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1f5057;
}
</style>
