<template >
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="modalStore.hiddenClass">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div @click="isOpen = false" class="modal-close cursor-pointer z-50">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li class="flex-auto text-center">
              <a @click.prevent="tab = 'login'" class="block rounded py-3 px-4 transition "
                :class="{ 'hover:text-white text-white bg-purple-600': tab === 'login', 'hover:text-purple-600': tab === 'register' }"
                href="#">Login</a>
            </li>
            <li class="flex-auto text-center">
              <a @click.prevent="tab = 'register'" class="block rounded py-3 px-4 transition"
                :class="{ 'hover:text-white text-white bg-purple-600': tab === 'register', 'hover:text-purple-600': tab === 'login' }"
                href="#">Register</a>
            </li>
          </ul>

          <!-- Login Form -->
          <vee-form v-show="tab === 'login'">
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <input type="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <input type="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Password" />
            </div>
            <button type="submit"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">
              Submit
            </button>
          </vee-form>
          <!-- Registration Form -->
          <app-alert v-if="reg_show_alert" :message="alertMsg" :bgColor="bgColor"></app-alert>
          <vee-form v-show="tab === 'register'" :validation-schema="schema" @submit="register" :initial-values="defaultValues">
            <!-- Name -->
            <div class="mb-3">
              <label class="inline-block mb-2">Name</label>
              <vee-field type="text" name="name"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Name" />
              <vee-error name="name" class="text-red-600"></vee-error>
            </div>
            <!-- Email -->
            <div class="mb-3">
              <label class="inline-block mb-2">Email</label>
              <vee-field type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
              <vee-error name="email" class="text-red-600"></vee-error>
            </div>
            <!-- Age -->
            <div class="mb-3">
              <label class="inline-block mb-2">Age</label>
              <vee-field type="number" name="age"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
              <vee-error name="age" class="text-red-600"></vee-error>
            </div>
            <!-- Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Password</label>
              <vee-field name="password" :bails="false" v-slot="{ field, errors }">
                <input type="password" v-bind="field"
                  class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                  placeholder="Password">
                <div class="text-red-600" v-for="error of errors" :key="error">
                  {{ error }}</div>
              </vee-field>

            </div>
            <!-- Confirm Password -->
            <div class="mb-3">
              <label class="inline-block mb-2">Confirm Password</label>
              <vee-field type="password" name="confirm_password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Confirm Password" />
              <vee-error name="confirm_password" class="text-red-600"></vee-error>
            </div>
            <!-- Country -->
            <div class="mb-3">
              <label class="inline-block mb-2">Country</label>
              <vee-field as="select" name="country"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                <option value="USA">USA</option>
                <option value="India">India</option>
                <option value="Mexico">Mexico</option>
                <option value="Germany">Germany</option>
                <option value="Antarctica">Antarctica</option>
              </vee-field>
              <vee-error name="country" class="text-red-600"></vee-error>
            </div>
            <!-- TOS -->
            <div class="mb-3 pl-6">
              <vee-field type="checkbox" name="tos" class="w-4 h-4 float-left -ml-6 mt-1 rounded" value="1" />
              <label class="inline-block">Accept terms of service</label>
              <vee-error name="tos" class="text-red-600 block"></vee-error>
            </div>
            <button type="submit"
            :disabled="reg_in_submission"
              class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700 disabled:opacity-50">
              Submit
            </button>
          </vee-form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapStores, mapWritableState } from 'pinia';
import useModalStore from '@/stores/modal';
import AppAlert from './AppAlert.vue';


export default {
  name: 'AppAuth',
  components: {
    'AppAlert': AppAlert
  },
  computed: {
    ...mapStores(useModalStore, {
      'hiddenClass': 'hiddenClass'
    }),
    ...mapWritableState(useModalStore, ["isOpen"])
  },
  mounted() { },
  data() {
    return {
      tab: 'login',
      schema: {
        name: 'required|min:2|max:20|alpha_spaces',
        email: 'required|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:8|max:20|excluded:password',
        confirm_password: 'required|confirmed:@password',
        country: 'required|excluded:Antarctica',
        tos: 'tos'
      },
      defaultValues:{
        country:'India'
      },
      reg_in_submission: false,
      alertMsg: '',
      bgColor: 'bg-red-500',
      reg_show_alert: false
    }
  },
  methods: {
    register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.alertMsg = 'Registration in progress...';
      this.bgColor = 'bg-yellow-500';

      setTimeout(() => {
        this.alertMsg = 'Registration successful!';
        this.bgColor = 'bg-green-500';
      }, 2000);

      console.log(values)

    }
  }
}
</script>
