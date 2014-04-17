//---------------------------------------------------------------------------------------------------------------------------------
// File: test-config.js
// Contents: configuration for tests
// 
// Copyright Microsoft Corporation
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
//
// You may obtain a copy of the License at:
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//---------------------------------------------------------------------------------------------------------------------------------

// server connection info
var driver = 'SQL Server Native Client 11.0';
var server = 'db1-muc.int.vocatus-ag.de\\SQL5_MUC';
var user = '...';
var pwd = '...';
var database = 'ZI00_Development';
var useTrustedConnection = true;
var connectionString = "Driver={" + driver + "};Server=" + server + ";" + ((useTrustedConnection) ? "Trusted_Connection={Yes};" : "UID=" + user + ";PWD=" + pwd + ";") + "Database={" + database + "};";

var config = {};
// The following need to be exported for building connection strings within a test...
config.database = database;
config.server = server;
config.user = user;
config.pwd = pwd;
// Driver name needs to be exported for building expected error messages...
config.driver = driver;
// Here's a complete connection string which can be shared by multiple tests...
config.connectionString = connectionString;

exports.config = config;