node {
    def app
    stage('Clone repository') {
        git 'https://github.com/EunjaeJo/cabinet.git'
        }
    stage('Build image') {
        app = docker.build("jaeae/cabinet")
    }
    stage('Test image') {
        app.inside {
            sh 'npm install'
            sh 'npm test'
        }
    }
    stage('Push image') {
        docker.withRegistry('https://registry.hub.docker.com', 'jaeae') {
          app.push("${env.BUILD_NUMBER}")
          app.push("latest")
        }
    }
}
