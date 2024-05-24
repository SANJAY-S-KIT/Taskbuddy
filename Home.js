import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground } from 'react-native';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim() === '') return;
    const updatedTasks = [...tasks, { id: tasks.length + 1, title: newTask, completed: false }];
    setTasks(updatedTasks);
    setNewTask('');
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  const renderTaskItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <TouchableOpacity
        style={[styles.taskItem, { backgroundColor: item.completed ? '#e0e0e0' : 'transparent' }]}
        onPress={() => toggleTaskCompletion(item.id)}
      >
        <Text style={styles.taskTitle}>{item.title}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground source={require('../assets/back.jpg.png')} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Task Buddy</Text>
        <View style={styles.addTaskContainer}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ flexGrow: 1 }}
          style={{ flex: 1 }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addTaskContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#2980b9',
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskItem: {
    flex: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff6347',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Home;