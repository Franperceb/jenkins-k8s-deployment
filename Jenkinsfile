pipeline {
  environment {
    dockerimagename = "franperceb/dinmover-web-app_image1"
    dockerImage = ""
  }
  agent any
  stages {
    stage('Checkout Source') {
      steps {
        git 'https://github.com/Franperceb/jenkins-k8s-deployment.git'
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