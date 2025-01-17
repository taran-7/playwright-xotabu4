import { expect } from "@playwright/test";
import { AppPage } from "../../abstractClasses";
import { Header } from "../../component/header.component";
import { MiniCart } from "../../component/minicart.component";
import { Review } from "./component/review.component";

export class Product extends AppPage {
    public pagePath = '/product';

    public header = new Header(this.page);
    public miniCart = new MiniCart(this.page);

    private addToBagButton = this.page.getByRole('button', { name: 'Add To Bag' });
    private removeFromBagButton = this.page.getByRole('button', { name: 'Remove From Bag' });

    public reviewComponent = new Review(this.page);

    async expectLoaded(message = 'Expected Product page to be opened') {
        await expect(this.addToBagButton
            .or(this.removeFromBagButton),
            message
        ).toBeVisible();
    }

    override async open(productPath: string): Promise<void> {
        await this.page.goto(productPath);
    }

    async addToBag() {
        await this.expectLoaded();
        await this.addToBagButton.click();
    }
}