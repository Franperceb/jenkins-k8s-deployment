pipeline {
  environment {
    dockerimagename = "franperceb/dinmover-web-app_image1"
    dockerImage = "franperceb/dinmover-web-app_image1"
  }
  agent any
  stages {
    stage('Checkout Source') {
      steps {
        checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Franperceb/jenkins-k8s-deployment']]])
      }
    }
    stage('Build image') {
      steps{
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }
    stage('Pushing Image') {
      environment {
               registryCredential = 'dockerhub-credentials'
           }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
          }
        }
      }
    }
    stage('Deploying DINMOVER backend container to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "backend-deployment.yaml", "backend-service.yaml")
        }
      }
    }
  }
}