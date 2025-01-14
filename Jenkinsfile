pipeline{
  agent any
  tools{
    nodejs 'latest'
  }
  stages{
    stage('Build'){
      steps{
          echo "Building application"
          sh 'cd backend'
          sh 'npm install'
          sh 'npm start &'
          sh 'cd ../frontend'
          sh 'npm install'
          sh 'npm start &'
      }
    }
  }
}
