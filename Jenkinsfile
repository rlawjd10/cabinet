pipeline {
    agent any
    environment {
        PROJECT_ID = 'opensource-398703'
        CLUSTER_NAME = 'k8s'
        LOCATION = 'asia-northeast3-a'
        CREDENTIALS_ID = 'gke_opensource-398703_asia-northeast3-a_k8s'
    }
    stages {
        stage("Checkout code") {
            steps {
                checkout scm
            }
        }
        stage('Build Image') {
            steps {
                script {
                    myapp = docker.build("jekim12/cabinet:${env.BUILD_ID}")
                }
            }
        }
        stage('Push image to Docker Hub') {
            steps {
                script {
                        docker.withRegistry('https://index.docker.io/v1/', 'jekim12') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                        }
                }
            }
        }
        stage('Deploy to GKE') {
            when {
                branch 'master'
            }
            steps {
                sh "sed -i 's/cabinet:latest/cabinet:${env.BUILD_ID}/g' deployment.yaml"
                step([$class: 'KubernetesEngineBuilder', 
                      projectId: env.PROJECT_ID, 
                      clusterName: env.CLUSTER_NAME, 
                      location: env.LOCATION, 
                      manifestPattern: 'deployment.yaml', 
                      credentialsId: env.CREDENTIALS_ID, 
                      verifyDeployments: false])
            }
        } 
    }
}
