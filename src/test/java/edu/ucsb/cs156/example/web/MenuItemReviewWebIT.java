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

import java.time.LocalDateTime;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("integration")
@DirtiesContext(classMode = ClassMode.BEFORE_EACH_TEST_METHOD)
public class MenuItemReviewWebIT extends WebTestCase {
    @Test
    public void admin_user_can_create_edit_delete_recommendation_request() throws Exception {
        setupUser(true);

        page.getByText("Menu Item Reviews").click();

        LocalDateTime ldt = LocalDateTime.parse("2022-01-03T00:00:00");

        page.getByText("Create MenuItemReview").click();
        assertThat(page.getByText("Create New MenuItemReview")).isVisible();
        page.getByTestId("MenuItemReviewForm-itemId").fill("1");
        page.getByTestId("MenuItemReviewForm-reviewerEmail").fill("test@gmail.com");
        page.getByTestId("MenuItemReviewForm-stars").fill("5");
        page.getByTestId("MenuItemReviewForm-dateReviewed").fill(ldt.toString());
        page.getByTestId("MenuItemReviewForm-comments").fill("Very good food");
        page.getByTestId("MenuItemReviewForm-submit").click();

        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments"))
                .hasText("Very good food");

        page.getByTestId("MenuItemReviewTable-cell-row-0-col-Edit-button").click();
        assertThat(page.getByText("Edit MenuItemReview")).isVisible();
        page.getByTestId("MenuItemReviewForm-comments").fill("Very bad food");
        page.getByTestId("MenuItemReviewForm-submit").click();

        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments"))
                .hasText("Very bad food");

        page.getByTestId("MenuItemReviewTable-cell-row-0-col-Delete-button").click();

        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments"))
                .not().isVisible();
    }

    @Test
    public void regular_user_cannot_create_recommendation_request() throws Exception {
        setupUser(false);

        page.getByText("Menu Item Reviews").click();

        assertThat(page.getByText("Create MenuItemReview")).not().isVisible();
        assertThat(page.getByTestId("MenuItemReviewTable-cell-row-0-col-comments")).not().isVisible();
    }
}