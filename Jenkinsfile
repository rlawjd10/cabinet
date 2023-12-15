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
    }

    stages {
        stage('clone') {
            steps {
                checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/rlawjd10/cabinet.git']])
            }
        }

        stage('Build Image') {
            steps {
                script {
                    // Docker 이미지 빌드
                    sh 'docker build -t jekim12/cabinet:latest -f Dockerfile .'
                }
            }
        }

        stage('Push image to Docker Hub') {
            steps {
                script {
                        docker.withRegistry('https://index.docker.io/v1/', 'jekim12') {
                            sh "docker push jekim12/cabinet"
                        }
                    
                }
            }
        }
        stage('Deploy to GKE') {
            when {
                branch 'master'
            }
            steps {
                sh "sed -i 's/cabinet:latest/hello:${env.BUILD_ID}/g' deployment.yaml"
step([$class: 'KubernetesEngineBuilder', projectId: env.PROJECT_ID, clusterName: env.CLUSTER_NAME, 
location: env.LOCATION, manifestPattern: 'deployment.yaml', credentialsId: env.CREDENTIALS_ID, 
verifyDeployments: false])
            }
        } 
    }
}
