package edu.ucsb.cs156.example.integration;

import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithMockUser;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.fasterxml.jackson.databind.ObjectMapper;

import edu.ucsb.cs156.example.entities.HelpRequests;
import edu.ucsb.cs156.example.repositories.HelpRequestsRepository;
import edu.ucsb.cs156.example.repositories.UserRepository;
import edu.ucsb.cs156.example.services.CurrentUserService;
import edu.ucsb.cs156.example.services.GrantedAuthoritiesService;
import edu.ucsb.cs156.example.testconfig.TestConfig;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("integration")
@Import(TestConfig.class)
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class HelpRequestIT {
        @Autowired
        public CurrentUserService currentUserService;

        @Autowired
        public GrantedAuthoritiesService grantedAuthoritiesService;

        @Autowired
        HelpRequestsRepository helpRequestsRepository;

        @Autowired
        public MockMvc mockMvc;

        @Autowired
        public ObjectMapper mapper;

        @MockBean
        UserRepository userRepository;

        @WithMockUser(roles = { "USER" })
        @Test
        public void test_that_logged_in_user_can_get_by_id_when_the_id_exists() throws Exception {
                // arrange
                LocalDateTime dateRequested = LocalDateTime.parse("2021-06-01T00:00:00");
                HelpRequests helpRequest = HelpRequests.builder()
                                .requesterEmail("test@ucsb.edu")
                                .teamId("f24-5pm")
                                .tableOrBreakoutRoom("6")
                                .requestTime(dateRequested)
                                .explanation("explain")
                                .solved(true) // Assuming 'solved' is a boolean
                                .build();


                helpRequestsRepository.save(helpRequest);

                // act
                MvcResult response = mockMvc.perform(get("/api/HelpRequests?id=1"))
                                .andExpect(status().isOk()).andReturn();

                // assert
                String expectedJson = mapper.writeValueAsString(helpRequest);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }

        @WithMockUser(roles = { "ADMIN", "USER" })
        @Test
        public void an_admin_user_can_post_a_new_help_request() throws Exception {
                // arrange
                LocalDateTime dateRequested = LocalDateTime.parse("2021-06-01T00:00:00");
                HelpRequests helpRequest1 = HelpRequests.builder()
                        .id(1L)
                        .requesterEmail("test@ucsb.edu")
                        .teamId("f24-5pm")
                        .tableOrBreakoutRoom("6")
                        .requestTime(dateRequested) // Enclosed in quotes
                        .explanation("explain")
                        .solved(true) // Assuming 'solved' is a boolean
                        .build();
                // act
                MvcResult response = mockMvc.perform(
                                post("/api/HelpRequests/post?requesterEmail=test@ucsb.edu&teamId=f24-5pm&tableOrBreakoutRoom=6&requestTime=2021-06-01T00:00:00&explanation=explain&solved=true")
                                                .with(csrf()))
                                .andExpect(status().isOk()).andReturn();

                // assert
                String expectedJson = mapper.writeValueAsString(helpRequest1);
                String responseString = response.getResponse().getContentAsString();
                assertEquals(expectedJson, responseString);
        }
}