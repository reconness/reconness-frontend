export default ({
  namespaced: true,
  state: {
    targetListStore: [
      {
        id: 1,
        name: 'My target 1',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '02/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                bounty: true,
                ignore: false,
                scope: true,
                agent: [
                  {
                    name: 'Agent 1',
                    background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                    id: 1,
                    repository: 'repository1.com',
                    target: 'target 1',
                    command: 'command 1',
                    type: 3,
                    isAliveTrigger: true,
                    isHttpOpenTrigger: false,
                    script: 'run agent 1',
                    image: '',
                    date: '21/01/2020',
                    installedFrom: '',
                    lastRun: '01/01/2021',
                    status: 2
                  },
                  {
                    name: 'Agent 2',
                    background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                    id: 2,
                    repository: 'repository2.com',
                    target: 'target 2',
                    command: 'command 2',
                    type: 3,
                    isAliveTrigger: true,
                    isHttpOpenTrigger: false,
                    script: 'run agent  2',
                    image: '',
                    date: '21/02/2020',
                    installedFrom: '',
                    lastRun: '02/01/2021',
                    status: 2
                  }
                ],
                ipAddress: '34.234.345.37',
                http: true,
                isAlive: true,
                ports: [21, 22],
                services: [{ id: 1, name: 'Https', port: 80 }, { id: 2, name: 'Http', port: 81 }],
                directories: [{ id: 1, path: '/_tmp-war-DefaultWebAoo', method: 'GET', status: 301, size: '60B' },
                  { id: 2, path: '/_tmp-war-DefaultWebAou', method: 'GET', status: 301, size: '60B' }],
                messages: [
                  {
                    id: 1,
                    sender: 'Cardenal',
                    sendDate: '2020-03-01',
                    message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
                  },
                  {
                    id: 2,
                    sender: 'Orozco',
                    sendDate: '2020-05-01',
                    message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
                  }
                ]
              },
              {
                id: 2,
                name: 'Portraite',
                added: '2020-12-02',
                checking: false,
                interesting: true,
                vulnerable: true,
                bounty: true,
                ignore: false,
                scope: true,
                agent: [
                  {
                    name: 'Agent 3',
                    background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                    id: 3,
                    repository: 'repository3.com',
                    target: 'target 3',
                    command: 'command 3',
                    type: 3,
                    isAliveTrigger: true,
                    isHttpOpenTrigger: false,
                    script: 'run agent 3',
                    image: '',
                    date: '21/03/2020',
                    installedFrom: '',
                    lastRun: '',
                    status: 2
                  },
                  {
                    name: 'Agent 4',
                    background: '#ff8650 0% 0% no-repeat padding-box',
                    id: 4,
                    repository: 'repository4.com',
                    target: 'target 4',
                    command: 'command 4',
                    type: 1,
                    isAliveTrigger: true,
                    isHttpOpenTrigger: false,
                    script: 'run agent 4',
                    image: '',
                    date: '21/04/2020',
                    installedFrom: '',
                    lastRun: '01/03/2021',
                    status: 2
                  }
                ],
                ipAddress: '34.234.345.34',
                http: true,
                isAlive: false,
                ports: [21, 22, 80, 443],
                services: [{ id: 1, name: 'Http', port: 80 }, { id: 2, name: 'Http', port: 82 }],
                directories: [],
                messages: []
              }
            ],
            messages: [
              {
                id: 1,
                sender: 'Sarah Jessica',
                sendDate: '2020-07-01',
                message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
              },
              {
                id: 2,
                sender: 'Daddy',
                sendDate: '2020-08-01',
                message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
              }
            ],
            agent: [
              {
                name: 'Agent 1',
                background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                id: 1,
                repository: 'repository1.com',
                target: 'target 1',
                command: 'command 1',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent 1',
                image: '',
                date: '21/01/2020',
                installedFrom: '',
                lastRun: '01/01/2021',
                status: 2
              },
              {
                name: 'Agent 2',
                background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                id: 2,
                repository: 'repository2.com',
                target: 'target 2',
                command: 'command 2',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent  2',
                image: '',
                date: '21/02/2020',
                installedFrom: '',
                lastRun: '02/01/2021',
                status: 2
              },
              {
                name: 'Agent 3',
                background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                id: 3,
                repository: 'repository1.com',
                target: 'target 1',
                command: 'command 1',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent 1',
                image: '',
                date: '21/01/2020',
                installedFrom: '',
                lastRun: '01/01/2021',
                status: 2
              },
              {
                name: 'Agent 4',
                background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                id: 4,
                repository: 'repository2.com',
                target: 'target 2',
                command: 'command 2',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent  2',
                image: '',
                date: '21/02/2020',
                installedFrom: '',
                lastRun: '02/01/2021',
                status: 2
              },
              {
                name: 'Agent 5',
                background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                id: 5,
                repository: 'repository2.com',
                target: 'target 2',
                command: 'command 2',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent  2',
                image: '',
                date: '21/02/2020',
                installedFrom: '',
                lastRun: '02/01/2021',
                status: 2
              }
            ]
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                bounty: true,
                ignore: false,
                scope: true,
                agent: [],
                ipAddress: '34.234.345.34',
                http: true,
                isAlive: true,
                ports: [21, 22, 80, 443],
                isMainPortal: true,
                services: [{ id: 1, name: 'Http', port: 80 }, { id: 2, name: 'Http', port: 81 }],
                directories: [],
                messages: [
                  {
                    id: 1,
                    sender: 'Parker',
                    sendDate: '2020-02-01',
                    message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
                  },
                  {
                    id: 2,
                    sender: 'Habana',
                    sendDate: '2020-09-01',
                    message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
                  }
                ]
              },
              {
                id: 2,
                name: 'yahoo.com',
                date: '2020-12-02',
                checking: false,
                interesting: true,
                vulnerable: true,
                bounty: true,
                ignore: false,
                scope: true,
                agent: ['Portraite'],
                isAlive: false,
                ports: [21],
                ipAddress: '34.234.345.34',
                http: true,
                isMainPortal: true,
                services: [{ id: 1, name: 'Http', port: 80 }, { id: 2, name: 'Http', port: 80 }],
                directories: [],
                messages: []
              }
            ],
            messages: [
              {
                id: 1,
                sender: 'Bieber',
                sendDate: '2020-12-01',
                message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
              }
            ],
            agent: [
              {
                name: 'Agent 3',
                background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                id: 3,
                repository: 'repository3.com',
                target: 'target 3',
                command: 'command 3',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent 3',
                image: '',
                date: '21/03/2020',
                installedFrom: '',
                lastRun: '',
                status: 2
              },
              {
                name: 'Agent 4',
                background: '#ff8650 0% 0% no-repeat padding-box',
                id: 4,
                repository: 'repository4.com',
                target: 'target 4',
                command: 'command 4',
                type: 1,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent 4',
                image: '',
                date: '21/04/2020',
                installedFrom: '',
                lastRun: '01/03/2021',
                status: 2
              }
            ]
          }
        ],
        bugBountyUrl: 'http://hackerone.com/a',
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-01-01',
            message: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.'
          },
          {
            id: 2,
            sender: 'Belinda',
            sendDate: '2020-12-01',
            message: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'
          }
        ]
      },
      {
        id: 2,
        name: 'My target 2',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                bounty: true,
                ignore: false,
                scope: true,
                ipAddress: '34.234.345.34',
                http: true,
                isAlive: false,
                isMainPortal: false,
                ports: [21],
                services: [{ id: 1, name: 'Http', port: 80 }, { id: 2, name: 'Http', port: 80 }],
                directories: [],
                messages: [
                  {
                    id: 1,
                    sender: 'Vinil',
                    sendDate: '2020-01-01',
                    message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
                  }
                ],
                agent: [
                  {
                    name: 'Agent 1',
                    background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                    id: 1,
                    repository: 'repository1.com',
                    target: 'target 1',
                    command: 'command 1',
                    type: 3,
                    isAliveTrigger: true,
                    isHttpOpenTrigger: false,
                    script: 'run agent 1',
                    image: '',
                    date: '21/01/2020',
                    installedFrom: '',
                    lastRun: '01/01/2021',
                    status: 2
                  },
                  {
                    name: 'Agent 2',
                    background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                    id: 2,
                    repository: 'repository2.com',
                    target: 'target 2',
                    command: 'command 2',
                    type: 3,
                    isAliveTrigger: true,
                    isHttpOpenTrigger: false,
                    script: 'run agent  2',
                    image: '',
                    date: '21/02/2020',
                    installedFrom: '',
                    lastRun: '02/01/2021',
                    status: 2
                  }
                ]
              }
            ],
            messages: [
              {
                id: 1,
                sender: 'Queen',
                sendDate: '2020-01-01',
                message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
              }
            ],
            agent: [
              {
                name: 'Agent 1',
                background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                id: 1,
                repository: 'repository1.com',
                target: 'target 1',
                command: 'command 1',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent 1',
                image: '',
                date: '21/01/2020',
                installedFrom: '',
                lastRun: '01/01/2021',
                status: 2
              },
              {
                name: 'Agent 2',
                background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                id: 2,
                repository: 'repository2.com',
                target: 'target 2',
                command: 'command 2',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent  2',
                image: '',
                date: '21/02/2020',
                installedFrom: '',
                lastRun: '02/01/2021',
                status: 2
              }
            ]
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: [
              {
                name: 'Agent 1',
                background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                id: 1,
                repository: 'repository1.com',
                target: 'target 1',
                command: 'command 1',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent 1',
                image: '',
                date: '21/01/2020',
                installedFrom: '',
                lastRun: '01/01/2021',
                status: 2
              },
              {
                name: 'Agent 2',
                background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                id: 2,
                repository: 'repository2.com',
                target: 'target 2',
                command: 'command 2',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent  2',
                image: '',
                date: '21/02/2020',
                installedFrom: '',
                lastRun: '02/01/2021',
                status: 2
              }
            ]
          },
          {
            id: 3,
            root: 'anothertest1.com',
            date: '21/07/2018',
            subdomain: [],
            messages: [],
            agent: [
              {
                name: 'Agent 1',
                background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
                id: 1,
                repository: 'repository1.com',
                target: 'target 1',
                command: 'command 1',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent 1',
                image: '',
                date: '21/01/2020',
                installedFrom: '',
                lastRun: '01/01/2021',
                status: 2
              },
              {
                name: 'Agent 2',
                background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
                id: 2,
                repository: 'repository2.com',
                target: 'target 2',
                command: 'command 2',
                type: 3,
                isAliveTrigger: true,
                isHttpOpenTrigger: false,
                script: 'run agent  2',
                image: '',
                date: '21/02/2020',
                installedFrom: '',
                lastRun: '02/01/2021',
                status: 2
              }
            ]
          },
          {
            id: 4,
            root: 'anothertest2.com',
            date: '21/06/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/f',
        isPrivateProgram: false,
        inScope: 'In scope 5',
        outScope: 'In scope 5',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ],
        agent: [
          {
            name: 'Agent 1',
            background: 'transparent linear-gradient(160deg,#03DCED 0%, #0cb8e0 100%) 0% 0% no-repeat padding-box',
            id: 1,
            repository: 'repository1.com',
            target: 'target 1',
            command: 'command 1',
            type: 3,
            isAliveTrigger: true,
            isHttpOpenTrigger: false,
            script: 'run agent 1',
            image: '',
            date: '21/01/2020',
            installedFrom: '',
            lastRun: '01/01/2021',
            status: 2
          },
          {
            name: 'Agent 2',
            background: 'transparent linear-gradient(160deg,#737be5 0%, #7159d3 100%) 0% 0% no-repeat padding-box',
            id: 2,
            repository: 'repository2.com',
            target: 'target 2',
            command: 'command 2',
            type: 3,
            isAliveTrigger: true,
            isHttpOpenTrigger: false,
            script: 'run agent  2',
            image: '',
            date: '21/02/2020',
            installedFrom: '',
            lastRun: '02/01/2021',
            status: 2
          }
        ]
      },
      {
        id: 3,
        name: 'My target 3',
        primaryColor: '#F96767',
        secondaryColor: '#FF4343',
        date: '21/02/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [
              {
                id: 1,
                name: 'Yanet',
                added: '2020-12-01',
                checking: true,
                interesting: false,
                vulnerable: true,
                bounty: true,
                ignore: false,
                scope: true,
                agent: [],
                ipAddress: '34.234.345.34',
                http: true,
                isAlive: true,
                isMainPortal: false,
                ports: [21],
                services: [{ id: 1, name: 'Http', port: 80 }, { id: 2, name: 'Http', port: 80 }],
                directories: [],
                messages: []
              }
            ],
            messages: [
              {
                id: 1,
                sender: 'Raymond',
                sendDate: '2020-03-01',
                message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
              }
            ],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/b',
        isPrivateProgram: true,
        inScope: 'In scope 2',
        outScope: 'In scope 2',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 4,
        name: 'My target 4',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/04/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/c',
        isPrivateProgram: true,
        inScope: 'In scope 3',
        outScope: 'In scope 3',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 5,
        name: 'My target 5',
        primaryColor: '#3adb99',
        secondaryColor: '#16c465',
        date: '21/02/2018',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/d',
        isPrivateProgram: false,
        inScope: 'In scope 4',
        outScope: 'In scope 4',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 6,
        name: 'My target 6',
        // background: 'linear-gradient(130deg, #FF9966 0%, #f36a33 100%)',
        primaryColor: '#FF9966',
        secondaryColor: '#f36a33',
        date: '21/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 7,
        name: 'My target 7',
        // background: ' linear-gradient(160deg, #737be5 0%, #7159d3 100%)',
        primaryColor: '#737be5',
        secondaryColor: '#7159d3',
        date: '21/06/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        bugBountyUrl: 'http://hackerone.com/a',
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 8,
        name: 'My target 8',
        // background: ' linear-gradient(135deg, #03dced 0%, #0cb8e0 100%)',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/02/2018',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 9,
        name: 'My target 9',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '21/09/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 10,
        name: 'My target 10',
        primaryColor: '#3adb99',
        secondaryColor: '#16c465',
        date: '21/02/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      },
      {
        id: 11,
        name: 'My target 11',
        primaryColor: '#03dced',
        secondaryColor: '#0cb8e0',
        date: '20/01/2020',
        rootDomains: [
          {
            id: 1,
            root: 'reconnes.com',
            date: '21/09/2018',
            subdomain: [],
            messages: [],
            agent: []
          },
          {
            id: 2,
            root: 'anotherness.com',
            date: '21/08/2018',
            subdomain: [],
            messages: [],
            agent: []
          }
        ],
        isPrivateProgram: true,
        inScope: 'In scope 1',
        outScope: 'In scope 1',
        messages: [
          {
            id: 1,
            sender: 'Michael',
            sendDate: '2020-02-01',
            message: 'The point of using Lorem Ipsum is that it hrs a morer-less normal distribution of letters, as opposed to using..., making it look like readable English.'
          }
        ]
      }
    ],
    idTarget: -1,
    filterColour: '',
    isDefaultViewOnTarget: true,
    check: false,
    targetIdList: [],
    colorDelete: '#000000',
    idMessage: -1,
    loggedUser: { name: 'John Doe' },
    isTargetDeleted: false,
    isTableList: true,
    idSubdomain: 55,
    elementSelectedList: [],
    countElementSelected: 0,
    nameSubDomainOpened: '',
    agentStatus: {
      id: -1,
      status: -1
    },
    currentView: '',
    countSubdomainList: 0
  },
  mutations: {
    changeCounterSubdom (state, countSubd) {
      state.countSubdomainList = countSubd
    },
    removebyIdTarget (state, id) {
      const index = state.targetIdList.findIndex(target => target.id === id)
      if (index !== -1) {
        state.targetIdList.splice(index, 1)
        if (state.targetIdList.length === 0) {
          state.colorDelete = '#000000'
        }
      }
    },
    addIdTarget (state, target) {
      state.targetIdList.push(target)
      if (state.targetIdList.length === 1) {
        state.colorDelete = '#ff4545'
      }
    },
    editList (state) {
      state.check = !state.check
      state.styleList = '0px'
    },
    setIdTarget (state, id) {
      state.idTarget = id
    },
    removeTarget (state, targetName) {
      const index = state.targetListStore.findIndex(target => target.name === targetName)
      if (index !== -1) {
        state.targetListStore.splice(index, 1)
        state.nameRoute = ''
        state.valueDelete = ''
      }
    },
    removeRootDomain (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const rootsIndex = target.rootDomains.findIndex(roots => roots.id === params.idRootDomain)
      target.rootDomains.splice(rootsIndex, 1)
    },
    removeSubDomain (state, tarjetObj) {
      const target = state.targetListStore.find(item => item.id === tarjetObj.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === tarjetObj.idRoot)
      const subdIndex = roots.subdomain.findIndex(subd => subd.name === tarjetObj.nameSubd)
      roots.subdomain.splice(subdIndex, 1)
      state.nameRoute = ''
      state.valueDelete = ''
    },
    removeSubDomains (state, tarjetObj) {
      const target = state.targetListStore.find(item => item.id === tarjetObj.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === tarjetObj.idRoot)
      roots.subdomain = []
      state.nameRoute = ''
      state.valueDelete = ''
    },
    removeTargets (state) {
      for (const index1 in state.targetIdList) {
        const index = state.targetListStore.findIndex(target => target.id === state.targetIdList[index1].id)
        if (index !== -1) {
          state.targetListStore.splice(index, 1)
        }
      }
      state.targetIdList = []
      state.check = false
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    removeSubdomainChecked (state) {
      for (const index1 in state.elementSelectedList) {
        const target = state.targetListStore.find(target => target.id === state.elementSelectedList[index1].idTarget)
        const roots = target.rootDomains.find(roots => roots.id === state.elementSelectedList[index1].idRoot)
        const subdIndex = roots.subdomain.findIndex(subd => subd.id === state.elementSelectedList[index1].idSubdom)
        roots.subdomain.splice(subdIndex, 1)
      }
      state.elementSelectedList = []
      state.nameRoute = ''
    },
    setIsDefaultViewOnTarget (state, value) {
      state.isDefaultViewOnTarget = value
    },
    setIsDefaultTabButton (state, value) {
      state.isTableList = value
    },
    isFilter (state, backg) {
      state.filterColour = backg
    },
    addTarget (state, target) {
      state.targetListStore.push(target)
    },
    updateTarget (state, target) {
      const item = state.targetListStore.find(item => item.id === target.id)
      Object.assign(item, target)
    },
    cancelIdTarget (state) {
      state.targetIdList = []
      state.check = !state.check
      state.styleList = '1.25rem'
      state.colorDelete = '#000000'
    },
    orderDomainsByCalendar (state, id) {
      return state.targetListStore.find(item => item.id === id).rootDomains.sort((a, b) => {
        const as = a.date.split('/')
        const ad = new Date(as[2], as[1] - 1, as[0])
        const bs = b.date.split('/')
        const bd = new Date(bs[2], bs[1] - 1, bs[0])
        return ad - bd
      })
    },
    orderDomainsByNameAsc (state, id) {
      function compare (a, b) {
        if (a.root < b.root) {
          return -1
        }
        if (a.root > b.root) {
          return 1
        }
        return 0
      }
      return (state.targetListStore.find(item => item.id === id)).rootDomains.sort(compare)
    },
    orderDomainByNameDesc (state, id) {
      function compare (a, b) {
        if (b.root < a.root) {
          return -1
        }
        if (b.root > a.root) {
          return 1
        }
        return 0
      }
      return (state.targetListStore.find(item => item.id === id)).rootDomains.sort(compare)
    },
    setIdMessage (state, id) {
      state.idMessage = parseInt(id)
    },
    removeTargetMessage (state, idTarget) {
      const target = state.targetListStore.find(item => item.id === parseInt(idTarget))
      const messageIndex = target.messages.findIndex(message => message.id === parseInt(state.idMessage))
      target.messages.splice(messageIndex, 1)
    },
    removeRootDomainMessage (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain)
      const messageIndex = rootdomain.messages.findIndex(message => message.id === parseInt(state.idMessage))
      rootdomain.messages.splice(messageIndex, 1)
    },
    removeSubDomainMessage (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain)
      const subdomain = rootdomain.subdomain.find(subdomainItem => subdomainItem.id === params.idSubDomain)
      const messageIndex = subdomain.messages.findIndex(message => message.id === parseInt(state.idMessage))
      subdomain.messages.splice(messageIndex, 1)
    },
    sendTargetMessage (state, messageInfo, rootGetters) {
      const target = state.targetListStore.find(item => item.id === messageInfo.idTarget)
      const message = {
        id: state.idMessage++,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: state.loggedUser.name
      }
      target.messages.push(message)
    },
    sendRootDomainMessage (state, messageInfo) {
      const target = state.targetListStore.find(item => item.id === messageInfo.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === messageInfo.idRootDomain)
      const message = {
        id: state.idMessage++,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: state.loggedUser.name
      }
      rootdomain.messages.push(message)
    },
    sendSubDomainMessage (state, messageInfo) {
      const target = state.targetListStore.find(item => item.id === messageInfo.idTarget)
      const rootdomain = target.rootDomains.find(rootdomain => rootdomain.id === messageInfo.idRootDomain)
      const subdomain = rootdomain.subdomain.find(subDomain => subDomain.id === messageInfo.idSubDomain)
      const message = {
        id: state.idMessage++,
        message: messageInfo.message,
        sendDate: new Date(),
        sender: state.loggedUser.name
      }
      subdomain.messages.push(message)
    },
    setIsTargetDeleted (state, value) {
      state.isTargetDeleted = value
    },
    addSubdomain (state, params) {
      for (let index = 0; index < params.subdomainsItems.length; index++) {
        params.subdomainsItems[index].id = state.idSubdomain++
      }
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      roots.subdomain = roots.subdomain.concat(params.subdomainsItems)
    },
    addSelectedList (state, ObjectIn) {
      state.elementSelectedList.push(ObjectIn)
    },
    cancelElementSelected (state) {
      state.elementSelectedList = []
      state.nameRoute = ''
      state.countElementSelected = 0
    },
    removeCountElementSelected (state, idSub) {
      state.countElementSelected = state.countElementSelected - 1
      const subdIndex = state.elementSelectedList.findIndex(item => item.idSubdom === idSub)
      state.elementSelectedList.splice(subdIndex, 1)
    },
    addCountElementSelected (state) {
      state.countElementSelected = state.countElementSelected + 1
    },
    setNameSubDomainOpened (state, name) {
      state.nameSubDomainOpened = name
      return state.nameSubDomainOpened
    },
    setAgentStatus (state, agentStatus) {
      state.agentStatus = agentStatus
    },
    setCurrentView (state, viewName) {
      state.currentView = viewName
    },
    updateStatusRootDomainAgent (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const agent = roots.agent.find(agentItem => agentItem.id === params.idAgent)
      agent.status = params.status
    },
    updateStatusSubDomainAgent (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subd = roots.subdomain.find(sub => sub.id === params.idSubDomain)
      const agent = subd.agent.find(agentItem => agentItem.id === params.idAgent)
      agent.status = params.status
    },
    insertAgentIfNotExistInRootDomain (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const agent = roots.agent.find(agentItem => agentItem.id === params.agentData.id)
      if (!agent) {
        roots.agent.push(
          JSON.parse(JSON.stringify(params.agentData))
        )
      }
    },
    insertAgentIfNotExistInSubDomain (state, params) {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subd = roots.subdomain.find(sub => sub.id === params.idSubDomain)
      const agent = subd.agent.find(agentItem => agentItem.id === params.agentData.id)
      if (!agent) {
        subd.agent.push(
          JSON.parse(JSON.stringify(params.agentData))
        )
      }
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    filterByColor (state) {
      return function (colour) {
        return state.targetListStore.filter(item => ('linear-gradient(160deg,' + item.primaryColor + ' ' + '0%,' + item.secondaryColor + ' ' + '100%) 0% 0% no-repeat padding-box').includes(colour))
      }
    },
    getLasTenTargets (state) {
      if (state.targetListStore.length <= 10) {
        return state.targetListStore
      } else {
        return state.targetListStore.slice(state.targetListStore.length - 10)
      }
    },
    idTarget: state => {
      return state.idTarget
    },
    getTargetById: (state) => (id) => {
      return state.targetListStore.find(target => target.id === id)
    },
    getTargetMessages: (state) => (id) => {
      return state.targetListStore.find(target => target.id === id).messages
    },
    getRootDomainMessages: (state) => (params) => {
      const target = state.targetListStore.find(target => target.id === params.idTarget)
      if (target) {
        return target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain).messages
      } else {
        return []
      }
    },
    getSubDomainMessages: (state) => (params) => {
      const target = state.targetListStore.find(target => target.id === params.idTarget)
      if (target) {
        const rootDomain = target.rootDomains.find(rootdomain => rootdomain.id === params.idRootDomain)
        if (rootDomain) {
          const subdomain = rootDomain.subdomain.find(subdomain => subdomain.id === params.idSubDomain)
          if (subdomain) {
            return subdomain.messages
          } else {
            return []
          }
        }
      } else {
        return []
      }
    },
    checkIfTargetExistsByName: (state) => (targetInfo) => {
      const currentTarget = state.targetListStore.find(target => target.name === targetInfo.name)
      if (currentTarget && currentTarget.id !== targetInfo.id) {
        return true
      }
      return false
    },
    getSubdomainSize: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRootDomain)
      if (roots) {
        return roots.subdomain.length
      }
    },
    getSubDomain: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idtarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idrootdomain)
      const subdomain = roots.subdomain.find(subdItem => subdItem.id === params.idsubdomain)
      return subdomain
    },
    checkIfSubdomainExistsByName: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idtarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idrootdomain)
      const subdomain = roots.subdomain.find(subdItem => subdItem.name === params.name)
      if (subdomain) {
        return true
      }
      return false
    },
    filterTargetsByName: (state) => (data) => {
      if (data.name !== '') {
        let temporal = []
        if (!data.strict) {
          temporal = state.targetListStore.filter(item => item.name.toLowerCase().replace(/\s+/g, '').includes(data.name.toLowerCase().replace(/\s+/g, '')))
        } else {
          temporal = state.targetListStore.filter(item => item.name.toLowerCase().replace(/\s+/g, '') === data.name.toLowerCase().replace(/\s+/g, ''))
        }
        const entities = []
        temporal.forEach(element => {
          entities.push(
            {
              name: element.name,
              entityType: 1,
              entityId: element.id
            }
          )
        })
        return entities.filter((item, index) => entities.findIndex(obj => obj.name === item.name) === index)
      } else {
        return []
      }
    },
    filterRootDomainsByName: (state) => (data) => {
      let temporal = []
      state.targetListStore.forEach(element => {
        if (!data.strict) {
          temporal = temporal.concat(
            element.rootDomains.filter(item => item.root.includes(data.name))
          )
        } else {
          temporal = temporal.concat(
            element.rootDomains.filter(item => item.root === data.name)
          )
        }
      })
      const entities = []
      temporal.forEach(element => {
        entities.push(
          {
            name: element.root,
            entityType: 2,
            entityId: element.id
          }
        )
      })
      return entities.filter((item, index) => entities.findIndex(obj => obj.name === item.name) === index)
    },
    filterSubDomainsByName: (state) => (data) => {
      let temporal = []
      state.targetListStore.forEach(target => {
        target.rootDomains.forEach(rootDomain => {
          if (!data.strict) {
            temporal = temporal.concat(
              rootDomain.subdomain.filter(item => item.name.includes(data.name))
            )
          } else {
            temporal = temporal.concat(
              rootDomain.subdomain.filter(item => item.name === data.name)
            )
          }
        })
      })
      const entities = []
      temporal.forEach(element => {
        entities.push(
          {
            name: element.name,
            entityType: 3,
            entityId: element.id
          }
        )
      })
      return entities.filter((item, index) => entities.findIndex(obj => obj.name === item.name) === index)
    },
    listRootDomainsAgents: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      return roots.agent.slice(-4)
    },
    listSubdDomainsAgents: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subdomain = roots.subdomain.find(subd => subd.id === params.idSubd)
      return subdomain.agent.slice(-4)
    },
    listCurrentRunningRootDomainsAgent: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const runningAgent = roots.agent.find(agent => agent.status === 1)
      if (runningAgent) {
        return runningAgent.id
      }
      return -1
    },
    listCurrentRunningSubDomainsAgent: (state) => (params) => {
      const target = state.targetListStore.find(item => item.id === params.idTarget)
      const roots = target.rootDomains.find(roots => roots.id === params.idRoot)
      const subdomain = roots.subdomain.find(subd => subd.id === params.idSubd)
      const runningAgent = subdomain.agent.find(agent => agent.status === 1)
      if (runningAgent) {
        return runningAgent.id
      }
      return -1
    }
  }
})
