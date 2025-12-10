<template>
  <v-row justify="center">
    <div>
      <h1><span class="primary-color">Chat</span> Trainer</h1>
    </div>
  </v-row>
  <v-divider class="ma-6"></v-divider>
  <v-row>
    <v-col cols="3">
      <v-card text="..." variant="tonal"></v-card>
    </v-col>
    <v-col cols="9">
      <v-card text="..." variant="tonal"></v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="3">
      <v-card text="..." variant="tonal"></v-card>
    </v-col>
    <v-col cols="9">
      <!-- Chat interface -->
      <v-card class="d-flex flex-column" variant="tonal" style="height: 100%">
        <!-- Chat messages area -->
        <v-container class="flex-grow-1" style="overflow-y: auto">
          <v-list dense>
            <!-- Example messages -->
            <v-list-item>
              <v-list-item-content id="chatMessages">
                <v-list-item-title>Hello!</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <!-- More messages here -->
          </v-list>
        </v-container>
        <!-- Input field -->
        <v-text-field
          id="inputText"
          label="Type your message here..."
          single-line
          hide-details
        ></v-text-field>
      </v-card>
    </v-col>
  </v-row>
</template>
