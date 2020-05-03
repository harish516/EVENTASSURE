import { FormGroup } from '@angular/forms';

// a helper class designed for static method use
export class Utils {
  /** Validates all forms looping through nested form groups
   * @param formGroup The form group you wish to be validated including its children
   */
  public static validateAllFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
      if (control instanceof FormGroup) {
        this.validateAllFields(control);
      }
    });
  }
  
    public static getIconPath(iconName: string) {
        return './assets/icons/' + iconName + '.png';
    }

    public static getImagePath(iconName: string) {
        return './assets/img/' + iconName + '.png';
    }

    /** Retrieves an array of generic type and returns a generic types element based upon the set key */
    public static groupBy<T, K>(list: T[], getKey: (item: T) => K) {
        const map = new Map<K, T[]>();
        list.forEach((item) => {
            const key = getKey(item);
            const collection = map.get(key);
            if (!collection) {
                map.set(key, [item]);
            } else {
                collection.push(item);
            }
        });
        return map;
        // return Array.from(map.values());
    }
}
