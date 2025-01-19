pipeline {
    agent any

    parameters {
        choice(name: 'BRANCH_NAME', choices: ['main', 'develop', 'feature-branch'], description: 'Select branch to run')
        string(name: 'TAGS', defaultValue: '', description: 'Enter Playwright tags (e.g., @smoke,@regression)')
    }

    environment {
        NODEJS_VERSION = '18' // Change this if needed
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    echo "Checking out branch: ${params.BRANCH_NAME}"
                    checkout([$class: 'GitSCM', branches: [[name: "*/${params.BRANCH_NAME}"]],
                              userRemoteConfigs: [[url: 'https://github.com/abanobadel-star/playwrightCourse.git']]])
                }
            }
        }

        stage('Setup Node.js & Install Dependencies') {
            steps {
                script {
                    def nodeHome = tool name: 'NodeJS', type: 'hudson.plugins.nodejs.tools.NodeJSInstallation'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                    sh 'npm install'
                }
            }
        }

        stage('Run Playwright Tests') {
            steps {
                script {
                    def command = 'npx playwright test'
                    if (params.TAGS?.trim()) {
                        command += " --grep \"${params.TAGS}\""
                    }
                    sh command
                }
            }
        }

        stage('Publish Reports') {
            steps {
                publishHTML([reportDir: 'playwright-report', reportFiles: 'index.html', reportName: 'Test Report'])
            }
        }
    }
}

