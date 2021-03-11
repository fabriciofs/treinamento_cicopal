<template>
  <div class="q-ma-md">
    <q-pull-to-refresh @refresh="refresh" color="primary">
      <q-input
        v-model="task"
        type="text"
        label="Tarefa"
        v-on:keyup.enter="onAddTask"
      />
      <q-scroll-area v-if="userTasks" style="height: 87vh;">
        <q-card class="q-mt-sm" v-for="(task, index) in userTasks" :key="index">
          <q-card-section class="row justify-between">
            <span class="text-h6 col-11">{{ task.task }}</span>
            <q-btn
              flat
              class="col-1"
              color="negative"
              icon="delete"
              @click="onDelete(task.id)"
            />
          </q-card-section>
        </q-card>
      </q-scroll-area>
    </q-pull-to-refresh>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      task: null,
    };
  },
  computed: {
    ...mapState("Tasks", ["userTasks"]),
  },
  methods: {
    ...mapActions("Tasks", ["getTasks", "addTask", "deleteTask"]),
    async onAddTask() {
      if (this.task && this.task.trim().length > 0) {
        this.$q.loading.show({
          message:
            '</b>Adicionando tarefa<br/><span class="text-primary">Aguarde...</span>',
        });
        await this.addTask({ task: this.task });
        this.$q.loading.hide();
      }
      this.task = null;
    },
    async onDelete(id) {
      this.$q.loading.show({
        message:
          '</b>Excluindo tarefa<br/><span class="text-primary">Aguarde...</span>',
      });
      await this.deleteTask({ id });
      this.$q.loading.hide();
    },
    async refresh(done) {
      await this.getTasks();
      done();
    },
  },
  async created() {
    this.$q.loading.show({
      message:
        '</b>Buscando tarefas<br/><span class="text-primary">Aguarde...</span>',
    });
    await this.getTasks();
    this.$q.loading.hide();
  },
};
</script>

<style></style>
