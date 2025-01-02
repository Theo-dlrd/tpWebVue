<template>
  <div>
    <header><h1>Task Manager</h1></header>

    <!-- Formulaire pour ajouter une nouvelle tâche -->
    <div>
      <input v-model="newTaskTitle" placeholder="Nouvelle tâche" />
      <input v-model="newTaskDate" type="date" />
      <button @click="addTask">Ajouter Tâche</button>
      <button @click="clearTasks">Supprimer toutes les tâches</button>
      <button @click="removeCompletedTasks">
        Supprimer les tâches terminées
      </button>
      <!-- Nouveau bouton -->
    </div>

    <!-- Filtres pour les tâches -->
    <div>
      <button @click="setFilter('all')" :class="{ active: filter === 'all' }">
        Toutes les tâches
      </button>
      <button
        @click="setFilter('pending')"
        :class="{ active: filter === 'pending' }"
      >
        À faire
      </button>
      <button @click="setFilter('done')" :class="{ active: filter === 'done' }">
        Faites
      </button>
    </div>

    <!-- Affichage des tâches filtrées -->
    <ul>
      <TODOComponent
        v-for="todo in filteredTodos"
        :key="todo.id"
        :todo="todo"
        @delete="removeTask"
        @complete="markTaskAsDone"
        @update="updateTask"
      />
    </ul>

    <!-- Footer pour afficher le nombre de tâches restantes à faire -->
    <footer v-if="todos.length > 0">
      <span>Il reste {{ pendingTasksCount }} tâche(s) à faire.</span>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import TODOComponent from './TODOComponent.vue'

class TODO {
  id: number
  title: string
  status: string
  dueDate: string

  constructor(id: number, title: string, status: string, dueDate: string) {
    this.id = id
    this.title = title
    this.status = status
    this.dueDate = dueDate
  }
}

export default defineComponent({
  name: 'TodosTodos',
  components: {
    TODOComponent,
  },
  setup() {
    const todos = ref<TODO[]>([
      new TODO(1, 'Acheter du lait', 'pending', '2024-10-30'),
      new TODO(2, 'Appeler le docteur', 'done', '2024-10-31'),
      new TODO(3, 'Rédiger un rapport', 'pending', '2024-11-02'),
    ])

    const newTaskTitle = ref('')
    const newTaskDate = ref('')
    const filter = ref('all')

    const pendingTasksCount = computed(() => {
      return todos.value.filter(todo => todo.status === 'pending').length
    })

    const filteredTodos = computed(() => {
      if (filter.value === 'pending') {
        return todos.value.filter(todo => todo.status === 'pending')
      } else if (filter.value === 'done') {
        return todos.value.filter(todo => todo.status === 'done')
      }
      return todos.value
    })

    const addTask = () => {
      if (newTaskTitle.value.trim()) {
        const newTask = new TODO(
          todos.value.length + 1,
          newTaskTitle.value.trim(),
          'pending',
          newTaskDate.value,
        )
        todos.value.push(newTask)

        newTaskTitle.value = ''
        newTaskDate.value = ''
      }
    }

    const clearTasks = () => {
      todos.value = []
    }

    const removeTask = (id: number) => {
      todos.value = todos.value.filter(todo => todo.id !== id)
    }

    const markTaskAsDone = (id: number) => {
      const task = todos.value.find(todo => todo.id === id)
      if (task) {
        task.status = 'done' // Mettre à jour l'état de la tâche à "done"
      }
    }

    const updateTask = (updatedTodo: TODO) => {
      const index = todos.value.findIndex(todo => todo.id === updatedTodo.id)
      if (index !== -1) {
        todos.value[index] = updatedTodo
      }
    }

    // Fonction pour changer le filtre
    const setFilter = (newFilter: string) => {
      filter.value = newFilter
    }

    const removeCompletedTasks = () => {
      todos.value = todos.value.filter(todo => todo.status !== 'done')
    }

    return {
      newTaskTitle,
      newTaskDate,
      todos,
      filter,
      pendingTasksCount,
      filteredTodos,
      addTask,
      setFilter,
      clearTasks,
      removeTask,
      markTaskAsDone,
      removeCompletedTasks,
      updateTask,
    }
  },
})
</script>

<style scoped>
header h1 {
  margin: 0;
  padding: 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

input {
  margin-right: 10px;
  padding: 5px;
  border: 1px solid #ccc;
}

button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  margin-right: 5px; /* Ajout d'espacement entre les boutons */
}

button:hover {
  background-color: #0056b3;
}

.active {
  background-color: #0056b3; /* Couleur de fond pour le bouton actif */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 10px 0;
}

footer {
  margin-top: 20px;
  padding: 10px;
  text-align: center;
}

footer span {
  font-weight: bold;
}
</style>
