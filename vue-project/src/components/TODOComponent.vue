<template id="todo">
  <li class="todoTask">
    <div :class="statusClass">
      <h3 v-if="!isEditing" @dblclick="editTask">{{ todo.title }}</h3>

      <input
        v-if="isEditing"
        v-model="editedTitle"
        @blur="finishEdit"
        @keyup.enter="finishEdit"
        type="text"
      />

      <p>Status: {{ todo.status }}</p>
      <p>Échéance: {{ todo.dueDate }}</p>

      <!-- Bouton pour marquer la tâche comme terminée si elle est en cours -->
      <button id="done" @click="markAsDone" v-if="todo.status === 'pending'">
        Done
      </button>

      <!-- Bouton pour supprimer la tâche -->
      <button id="delete" @click="deleteTask">Delete</button>
    </div>
  </li>
</template>

<script lang="ts">
import { defineComponent, computed, type PropType, ref } from 'vue'

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
  name: 'TODOComponent',
  props: {
    todo: {
      type: Object as PropType<TODO>,
      required: true,
    },
  },
  emits: ['delete', 'complete', 'update'],
  setup(props, { emit }) {
    const isEditing = ref(false) // État pour savoir si on est en mode édition
    const editedTitle = ref(props.todo.title) // Stocker le titre édité

    // Calculer la classe CSS en fonction du statut de la tâche
    const statusClass = computed(() => {
      return props.todo.status === 'done' ? 'completed' : 'pending'
    })

    // Fonction pour supprimer la tâche
    const deleteTask = () => {
      emit('delete', props.todo.id)
    }

    // Fonction pour marquer la tâche comme terminée
    const markAsDone = () => {
      emit('complete', props.todo.id)
    }

    // Fonction pour entrer en mode édition (double-clic)
    // Fonction pour entrer en mode édition (double-clic)
    const editTask = () => {
      if (props.todo.status != 'done') {
        isEditing.value = true
      }
    }

    // Fonction pour terminer l'édition (en quittant le champ d'édition ou en appuyant sur Entrée)
    const finishEdit = () => {
      if (editedTitle.value.trim()) {
        emit('update', { ...props.todo, title: editedTitle.value.trim() }) // Envoyer l'événement d'édition
      }
      isEditing.value = false
    }

    return {
      deleteTask,
      markAsDone,
      statusClass,
      isEditing,
      editedTitle,
      editTask,
      finishEdit,
    }
  },
})
</script>

<style scoped>
.todoTask {
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: lightgray;
}

.completed {
  color: green;
}

.pending {
  color: red;
}

li {
  display: flex;
  justify-content: space-between; /* Séparer le texte et les boutons */
}

button {
  padding: 3px 7px;
  border: none;
  cursor: pointer;
}

#delete {
  background-color: red;
  color: white;
}

#done {
  background-color: green;
  color: white;
}

h3 {
  cursor: pointer; /* Indiquer que l'élément est cliquable */
}

input {
  padding: 5px;
  border: 1px solid #ccc;
}
</style>
