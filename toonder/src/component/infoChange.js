import React, { useState, useEffect, useRef } from 'react';
import Background from './backGround';
import supabase from './supabase';
import styles from './signIn.module.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
