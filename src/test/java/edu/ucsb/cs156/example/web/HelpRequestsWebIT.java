package edu.ucsb.cs156.example.web;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.annotation.DirtiesContext.ClassMode;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static com.microsoft.playwright.assertions.PlaywrightAssertions.assertThat;


import edu.ucsb.cs156.example.WebTestCase;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class HelpRequestsWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_help_request() throws Exception {
        setupUser(true);
        page.getByText("Help Requests").click();

        page.getByText("Create HelpRequest").click();
        assertThat(page.getByText("Create New HelpRequest")).isVisible();

        page.getByTestId("HelpRequestForm-requesterEmail").fill("test@ucsb.edu");
        page.getByTestId("HelpRequestForm-teamId").fill("f24-5pm");
        page.getByTestId("HelpRequestForm-tableOrBreakoutRoom").fill("6");
        page.getByTestId("HelpRequestForm-requestTime").fill("2021-06-01T00:00");
        page.getByTestId("HelpRequestForm-explanation").fill("explain");
        page.getByTestId("HelpRequestForm-solved").selectOption("true");
        page.getByTestId("HelpRequestForm-submit").click();

        assertThat(page.getByTestId("HelpRequestTable-cell-row-0-col-explanation"))
                .hasText("explain");

        page.getByTestId("HelpRequestTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit HelpRequest")).isVisible();
        page.getByTestId("HelpRequestForm-explanation").fill("Merge issue");
        page.getByTestId("HelpRequestForm-submit").click();

        assertThat(page.getByTestId("HelpRequestTable-cell-row-0-col-explanation")).hasText("Merge issue");

        page.getByTestId("HelpRequestTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("HelpRequestTable-cell-row-0-col-requesterEmail")).not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_HelpRequest() throws Exception {
        setupUser(false);

        page.getByText("Help Requests").click();

        assertThat(page.getByText("Create HelpRequest")).not().isVisible();
        assertThat(page.getByTestId("HelpRequestTable-cell-row-0-col-name")).not().isVisible();
    }
}
