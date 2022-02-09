#!/bin/bash
pipeline {
    agent any 
	options {
    buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '3'))
	}
    environment {
        def notificationContacts = "${distro}"
		def appName = "ODOS"
		def baseURL = ""
		def appURL = "${baseURL}/${environment}/${appName}"
		def environment = "DEV"
		def emailBodyPost = ""
		def fortifySh = ""	
    }

    stages {
        stage ('Initialize') {
            steps {
				script{
					try {
						sh 'echo "PATH = ${PATH}"'
						sh 'echo "M2_HOME = ${M2_HOME}"'
						sh 'echo "ehlo"'
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
		
		stage ('Start Email') {
			steps {
				script{
					try {
						echo "send an email"
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
			}
		}
		
		stage ('Build') {
			steps {
				script{
					try {
						//checkout code
						//checkout([$class: 'GitSCM', branches: [[name: '*/david-test']], extensions: [], userRemoteConfigs: [[credentialsId: 'gitAuth', url: 'https://github.com/david-sakoda/s7-ODOS-app.git']]])
						//sh 'cd keycloak'
						dir('./keycloak'){
							sh 'whoami'
							sh 'docker build -t odos/keycloak:$BUILD_ID --no-cache .'
						}
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
			}
		}
		
		stage ('Security Scan') {
            steps {
				script{
					try {
						
						echo "security scan"
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
		
		stage ('Deploy') {
            steps {
				script{
					try {
					  echo "commented for now"
					  //sh 'kubectl set image deployment/odos/keycloak odos/keycloak=odos/keycloak:$BUILD_ID'
					}
					catch (Exception e) {

						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }

        }		
		
		stage('Push Image') {
	    	steps {
		        //sh 'docker tag riskmap-keycloak:$env.BUILD_ID'
				sh 'docker tag odos/keycloak:$BUILD_ID asonadmin/odos_keycloak:latest'
				sh 'docker login -u "dsakoda" -p "Hong1322@" docker.io'
		      	sh 'docker push odos_keycloak:latest'
				
				
				
				 docker image tag rhel-httpd:latest registry-host:5000/myadmin/rhel-httpd:latest
 docker image push registry-host:5000/myadmin/rhel-httpd:latest

	      	}
		}
		
		stage ('Automation Tests') {
            steps {
				script{
					try {
						sh 'echo "Starting Automation Tests. this is a place holder"'
					}
					catch (Exception e) {
						error "Stage $env.STAGE_NAME Failed"
					}
				}
            }
        }
	}
	post{
		always{
			script{
				//def stageResults = ''
				//stageStatus.each{ key, val ->
				//	bat 'echo ' + key + ' : ' + val
					//stageResults += key
					//stageResults += ' : '
					//stageResults += val
					//stageResults += '<br />' 
					echo "always"
				//}
				//emailBodyPost = "<p> ${stageResults} <p> Artifacts are located <a href=\"${appURL}\">here</a>. <p> FPR located <a href=\"${env.BUILD_URL}\">here</a> "
			}
		}
		success {
            //mail to:"${notificationContacts}",
			//mimeType: "text/html",
			//subject:"SUCCESS: ${currentBuild.fullDisplayName}",
 		   // body: "<font color=\"green\"><strong>SUCCESS</strong></font>: SUCCESS <p> ${emailBodyPost}"
		   echo "success"
		}
		failure {
			///mail to:"${notificationContacts}",
			//mimeType: "text/html",
			//subject:"FAILURE: ${currentBuild.fullDisplayName}",
		    //body: "<font color=\"red\"><strong>FAILED</strong></font>: FAILURE <p> ${emailBodyPost}"
			echo "fail"
		}
	}
}