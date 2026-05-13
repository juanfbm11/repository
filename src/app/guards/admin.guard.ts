import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { UtilityService } from "../services/utility.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const utilService = inject(UtilityService);
  const router = inject(Router);

  if (utilService.isAdmin()) {
    return true;
  }

  router.navigate(["/home"]);
  return false;
};
